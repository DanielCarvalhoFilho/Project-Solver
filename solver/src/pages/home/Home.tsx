import './Home.css'
import { useState } from 'react';
import { showToast } from '../../components/Toast/Toast';
import { useFileService } from '../../resources/file/file.service';
import Modal from '../../components/Modal/Modal';
import type { ResponseProduto, ResponseSolverFunction } from '../../resources/file/file.resource';
import Header from '../../components/Header/Header';
import InputTable from '../../components/InputTable/InputTable';

function HomePage() {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [filename, setFilename] = useState('');
    const [data, setData] = useState<ResponseProduto>();
    const [result, setResult] = useState<ResponseSolverFunction>();
    const [showModal, setShowModal] = useState(false);

    const fileService = useFileService();

    const handleFileChange = async (e: any) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setFilename(file.name);
            setShowModal(true);

            e.target.value = '';
        }
    };

    const handleFileImport = async () => {
        if (selectedFile) {
            setShowModal(false);
            setResult(undefined);

            if (!selectedFile.name.endsWith('.xlsx')) {
                showToast('Por favor, selecione um arquivo xlsx!', 'error');
                setData(undefined);
                return;
            }

            const formData = new FormData();
            formData.append("file", selectedFile);

            const result = await fileService.upload(formData);

            const formattedData = result.produtos?.map((produto) => ({
                ...produto,
                lucro: formatMoney(produto.lucro + "00" || '0'),
            }));

            setData({ ...result, produtos: formattedData });
        }
    }

    const handleChange = (index: number, field: string, value: string | number) => {
        if (!data || !data.produtos) return;
        const updatedProdutos = [...data.produtos];

        if (field === 'lucro') {
            value = formatMoney(value as string);
        }

        if (updatedProdutos[index]) {
            updatedProdutos[index] = {
                ...updatedProdutos[index],
                [field]: value,
            };
        }

        setData({ ...data, produtos: updatedProdutos });
    };

    const handleChangeProducao = (value: any) => {
        if (!data || !data.produtos) return;

        setData({ ...data, producaoMaxima: value });
    };

    const handleSubmit = async () => {
        if (!data) {
            return;
        }

        const formattedData = data.produtos?.map((produto) => ({
            ...produto,
            lucro: (parseBigDecimal(produto.lucro || '0')).toString(),
        }));

        const result = await fileService.solverFunction({ ...data, produtos: formattedData });

        const numero = parseFloat(result.lucroFinal || '0');
        const lucro = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(numero);
        result.lucroFinal = lucro;

        setResult(result);
    }

    const formatMoney = (value: string | number) => {
        let money = value.toString().replace(/\D/g, '');


        if (money.length > 2) {
            money = money.replace(/(\d{2})$/, ',$1');
        } else {
            money = money.padStart(3, '0');
            money = money.replace(/(\d{2})$/, ',$1');
        }

        money = money.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        if (money) {
            return `R$ ${money}`;
        }

        return '';

    };

    const parseBigDecimal = (value: string | number) => {
        let text = value.toString();

        text = text.replace(/[^\d,.-]/g, '');

        text = text.replace(',', '.');

        return parseFloat(text);
    };

    return (
        <>
            <Header />

            <div className='p-5'>

                {showModal &&
                    <Modal filename={filename} onConfirm={handleFileImport} onCancel={() => setShowModal(false)} />
                }

                <div className='p-4 shadow bg-white rounded'>
                    <h3>Problema de Programação Linear</h3>
                    <p style={{ textAlign: 'justify', fontSize: '20px' }}>
                        Uma fábrica de roupas produz cinco tipos de produtos: camisa, camiseta, calça,
                        cueca e meia, esses produtos são vendidos respectivamente por R$40,00. A empresa
                        está limitada a produzir no máximo 400 peças por mês devido a restrições de recursos,
                        como mão de obra e materiais. Além disso, cada produto possui um lucro por unidade e
                        limitações de demanda mínima e máxima, que devem ser respeitadas para garantir a produção
                        eficiente e atender as necessidades do mercado.
                    </p>
                    <p style={{ textAlign: 'justify', fontSize: '20px' }}>
                        A empresa deseja maximizar o lucro total com a produção desses produtos, respeitando as
                        restrições de demanda mínima e máxima de cada tipo de roupa, além do limite de produção
                        total mensal.
                    </p>
                </div>

                <div className="mt-5 mb-3 d-flex align-items-center">
                    <label htmlFor="formFile" className="btn primary-color me-2">Escolher Arquivo</label>
                    <input onChange={handleFileChange} type="file" accept='.xlsx' id="formFile" />
                    <input type='text' readOnly value={filename} className="form-control" />
                </div>

                <div>
                    <table className="table table-bordered table-hover shadow">
                        <thead>
                            <tr>
                                <th className='secondary-color'>Produto</th>
                                <th className='secondary-color'>Lucro</th>
                                <th className='secondary-color'>Demanda Min.</th>
                                <th className='secondary-color'>Demanda Max.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.produtos &&
                                data?.produtos.map((produto, index) => (
                                    <tr key={index}>
                                        <td align='center'>
                                            <InputTable value={produto.nome} onChange={(e) => handleChange(index, 'nome', e.target.value)} />
                                        </td>
                                        <td align='center'>
                                            <InputTable value={produto.lucro} onChange={(e) => handleChange(index, 'lucro', e.target.value)} />
                                        </td>
                                        <td align='center'>
                                            <InputTable type={'number'} value={produto.min} onChange={(e) => handleChange(index, 'min', e.target.value)} />
                                        </td>
                                        <td align='center'>
                                            <InputTable type={'number'} value={produto.max} onChange={(e) => handleChange(index, 'max', e.target.value)} />
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                        <tfoot className='table-light'>
                            <tr>
                                <td colSpan={3} align='right'><strong>Produção Máxima Permitida</strong></td>
                                <td align='center'><InputTable type={'number'} value={data?.producaoMaxima} onChange={(e) => handleChangeProducao(e.target.value)} fontWeight='bold' /></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <div className='d-flex justify-content-center mt-4 mb-3'>
                    <button className='btn primary-color' onClick={handleSubmit}><strong>Resolver</strong></button>
                </div>

                {result &&
                    <div className='p-4'>

                        <table className="table table-bordered table-hover shadow">
                            <thead>
                                <tr>
                                    <th className='result'>Resultado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result?.produtos &&
                                    result?.produtos.map((data, index) => (
                                        <tr key={index}>
                                            <td>{data} unidades</td>
                                        </tr>
                                    ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td align="center">
                                        <strong>Lucro Total {result?.lucroFinal}</strong>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                }

            </div>
        </>
    );
}

export default HomePage