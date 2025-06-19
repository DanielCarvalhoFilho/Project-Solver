package com.fatec.solverapi.service;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fatec.solverapi.model.Produto;
import com.fatec.solverapi.model.ResponseProduto;
import com.fatec.solverapi.model.ResponseSolverFunction;
import com.google.ortools.Loader;
import com.google.ortools.linearsolver.MPConstraint;
import com.google.ortools.linearsolver.MPObjective;
import com.google.ortools.linearsolver.MPSolver;
import com.google.ortools.linearsolver.MPVariable;

@Service
public class ProdutoService {

    public ResponseProduto importFile(MultipartFile file) {
        ResponseProduto response = new ResponseProduto();
        List<Produto> produtos = new ArrayList<>();
        try (InputStream fis = file.getInputStream();
                XSSFWorkbook workbook = new XSSFWorkbook(fis)) {

            XSSFSheet sheet = workbook.getSheetAt(0);

            for (int i = 0; i < sheet.getPhysicalNumberOfRows(); i++) {
                var row = sheet.getRow(i);
                if (row != null) {
                    if (i == 0) {
                        String[] campos = row.getCell(0).getStringCellValue().split("-");
                        Integer producaoMaxima = Integer.parseInt(campos[1].trim());
                        response.setProducaoMaxima(producaoMaxima);
                        i++;
                        continue;
                    }

                    String nome = row.getCell(0).getStringCellValue();
                    BigDecimal lucro = new BigDecimal(row.getCell(1).getNumericCellValue());
                    Integer demandaMinima = (int) row.getCell(2).getNumericCellValue();
                    Integer demandaMaxima = (int) row.getCell(3).getNumericCellValue();

                    Produto produto = new Produto(nome, lucro, demandaMinima, demandaMaxima);
                    produtos.add(produto);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        response.setProdutos(produtos);
        return response;
    }

    public ResponseSolverFunction solverFunction(ResponseProduto entity) {
        List<Produto> produtos = entity.getProdutos();

        Loader.loadNativeLibraries();

        MPSolver solver = MPSolver.createSolver("GLOP");
        if (solver == null) {
            return null;
        }

        List<MPVariable> variables = new ArrayList<>();
        for (Produto produto : produtos) {
            variables.add(solver.makeIntVar(produto.getMin(), produto.getMax(), produto.getNome()));
        }

        double infinity = java.lang.Double.POSITIVE_INFINITY;
        MPConstraint capacidadeTotal = solver.makeConstraint(-infinity, entity.getProducaoMaxima(), "capacidadeTotal");
        for (Produto produto : produtos) {
            capacidadeTotal.setCoefficient(variables.get(produtos.indexOf(produto)), 1);
        }

        MPObjective objective = solver.objective();
        for (Produto produto : produtos) {
            objective.setCoefficient(variables.get(produtos.indexOf(produto)), produto.getLucro().doubleValue());
        }
        objective.setMaximization();

        final MPSolver.ResultStatus resultStatus = solver.solve();

        if (resultStatus != MPSolver.ResultStatus.OPTIMAL && resultStatus != MPSolver.ResultStatus.FEASIBLE) {
            return null;
        }

        List<String> result = new ArrayList<>();

        for(Produto produto : produtos){
            result.add(produto.getNome() + ": " + (int) variables.get(produtos.indexOf(produto)).solutionValue());
        }

        BigDecimal lucroFinal = BigDecimal.valueOf(objective.value());

        ResponseSolverFunction response = new ResponseSolverFunction(result, lucroFinal);

        return response;
    }

}
