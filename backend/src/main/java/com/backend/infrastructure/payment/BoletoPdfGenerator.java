package com.backend.infrastructure.payment;
import com.backend.infrastructure.model.Order;
import com.lowagie.text.*;
import com.lowagie.text.pdf.*;

import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

public class BoletoPdfGenerator {

    public static byte[] generate(Order order) {

        try {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();

            Document document = new Document();
            PdfWriter.getInstance(document, baos);

            document.open();

            // ===== TITULO =====
            Font titleFont = new Font(Font.HELVETICA, 18, Font.BOLD);
            Paragraph title = new Paragraph("BOLETO BANCÁRIO", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);

            document.add(new Paragraph("\n"));

            // ===== DADOS EMPRESA =====
            document.add(new Paragraph("Beneficiário: TechWave Eletrônicos"));
            document.add(new Paragraph("CNPJ: 00.000.000/0001-00"));

            document.add(new Paragraph("\n"));

            // ===== DADOS CLIENTE =====
            document.add(new Paragraph("Cliente: " + order.getUserName()));
            document.add(new Paragraph("Data: " + order.getCreatedAt()
                    .format(DateTimeFormatter.ofPattern("dd/MM/yyyy"))));

            document.add(new Paragraph("\n"));

            // ===== TABELA DE PRODUTOS =====
            PdfPTable table = new PdfPTable(4);
            table.setWidthPercentage(100);

            table.addCell("Produto");
            table.addCell("Qtd");
            table.addCell("Preço");
            table.addCell("Total");

            order.getItems().forEach(item -> {
                table.addCell(item.getProductName());
                table.addCell(item.getQuantity().toString());
                table.addCell("R$ " + item.getPrice());
                table.addCell("R$ " + (item.getPrice() * item.getQuantity()));
            });

            document.add(table);

            document.add(new Paragraph("\n"));

            // ===== TOTAL =====
            Font totalFont = new Font(Font.HELVETICA, 14, Font.BOLD);
            Paragraph total = new Paragraph("Valor Total: R$ " + order.getTotalAmount(), totalFont);
            document.add(total);

            document.add(new Paragraph("\n"));

            // ===== LINHA DIGITÁVEL FAKE =====
            String barcode = UUID.randomUUID().toString().replace("-", "");
            document.add(new Paragraph("Linha Digitável: " + barcode));

            document.close();

            return baos.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Erro ao gerar boleto PDF", e);
        }
    }
}