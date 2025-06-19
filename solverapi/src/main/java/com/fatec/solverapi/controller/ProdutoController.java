package com.fatec.solverapi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fatec.solverapi.model.ResponseProduto;
import com.fatec.solverapi.model.ResponseSolverFunction;
import com.fatec.solverapi.service.ProdutoService;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class ProdutoController {

    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }
    
    @PostMapping("/import")
    public ResponseEntity<ResponseProduto> importFile(@RequestBody MultipartFile file){
        var response = produtoService.importFile(file);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/solverFunction")
    public ResponseEntity<ResponseSolverFunction> solverFunction(@RequestBody ResponseProduto entity) {
        var response = produtoService.solverFunction(entity);
        return ResponseEntity.ok().body(response);
    }
    

}
