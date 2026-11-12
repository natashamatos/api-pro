const db = require("./db")

const ESTRUTURA_CLIENTE = `
    DROP TABLE IF EXISTS cliente;
    CREATE TABLE cliente (
        id int(11) NOT NULL AUTO_INCREMENT,
        nome varchar(100) NOT NULL,
        cpf char(14) NOT NULL,
        celular char(14) NOT NULL,
        email varchar(100) NOT NULL,
        senha varchar(512) NOT NULL,
        PRIMARY KEY (id),
        UNIQUE KEY cpf (cpf),
        UNIQUE KEY email (email)
    ) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4;
`

const DADOS_CLIENTE = `
    INSERT INTO cliente VALUES 
    (11, 'Natasha Matos', '712.669.552-93', '(42)99820-7398', 'natashaquero0508@gmail.com', '123456'),
    (13, 'Natasha Matos', '555.666.777.88', '(42)99829-2234', 'natashaa@gmail.com', '$2b$10$xcL527GxdPh6jPNvvF2W9ecbTr0YVWshZvf3GihiEGEyaSM3m1IlW'),
    (14, 'Nat Mat', '111.222.333.44', '(77)15987-2234', 'nata@gmail.com', '$2b$10$qxyEngSdndH1V4LdtWdePuAypISSBuG0enm.ZYwcQdyNFXbS5L3Qu'),
    (15, 'alexa quero', '125.325.785.98', '(55)45698-4587', 'alex@gmail.com', '$2b$10$JDFpLip3ruzVfX0zG4X5geIQc.EQODSgt21.I8rAWrsUak0jHpgrW'),
    (19, 'Natasha Matos', '555.666.777.98', '(42)99829-2234', 'natash@gmail.com', '$2b$10$yD73ijdDSYkFBExBwc7.NO6aQAXjEiJjqq5Wupdjq57gGaTH/Q2CS'),
    (20, 'Alexandra Quero', '555.666.722.33', '(42)99829-9876', 'alexandra@gmail.com', '$2b$10$WX6myBV4F2Xd0GRv2TNtvemAdNUIrlycZthbqZWFuu.9t/6RW.vhK'),
    (21, 'wesley souza', '16281718984', '42988157961', 'antoniowesley@gmail.com', '$2b$10$4f3f6wjoSk8JYshdwI..tO4ovUqYTyC6K2tDAox3O2j0JJOPKdJAK');
    `

const ESTRUTURA_PRODUTO = `
    DROP TABLE IF EXISTS produto;
    CREATE TABLE produto (
        id int(11) NOT NULL AUTO_INCREMENT,
        nome varchar(200) NOT NULL,
        descricao text NOT NULL,
        categoria varchar(50) NOT NULL,
        preco decimal(10,2) NOT NULL,
        caminho_img varchar(50) NOT NULL,
        quantidade_img int(11) NOT NULL,
        PRIMARY KEY (id)
    ) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4;
`

const DADOS_PRODUTO = `
    INSERT INTO produto VALUES
        (1,'Base Líquida Matte','Base de alta cobertura com acabamento matte e longa duração.','Rosto',59.90,'assets/img/base-liquida.jpg',12),
        (2,'Base Líquida Glow','Base leve com acabamento luminoso para uma pele radiante.','Rosto',64.90,'assets/img/base-glow.jpg',10),
        (3,'Corretivo Líquido Alta Cobertura','Corretivo cremoso para disfarçar olheiras e pequenas imperfeições.','Rosto',39.90,'assets/img/corretivo-liquido.jpg',15),
        (4,'Pó Compacto Matte','Pó compacto para controlar o brilho e selar a maquiagem.','Rosto',34.90,'assets/img/po-compacto.jpg',14),
        (5,'Pó Translúcido Solto','Pó ultrafino para selar a maquiagem sem adicionar cor.','Rosto',42.90,'assets/img/po-translucido.jpg',9),
        (6,'Blush Compacto Rosé','Blush com textura macia e cor natural para as maçãs do rosto.','Rosto',32.90,'assets/img/blush-rose.jpg',11),
        (7,'Blush Líquido Coral','Blush líquido de fácil aplicação e acabamento natural.','Rosto',36.90,'assets/img/blush-liquido.jpg',8),
        (8,'Contorno em Bastão','Contorno cremoso em bastão para definir e esculpir o rosto.','Rosto',44.90,'assets/img/contorno-bastao.jpg',7),
        (9,'Paleta de Contorno e Iluminador','Paleta com tons para contornar, iluminar e dar acabamento à pele.','Rosto',69.90,'assets/img/paleta-contorno.jpg',6),
        (10,'Iluminador Compacto Champagne','Iluminador com brilho delicado para realçar os pontos altos do rosto.','Rosto',39.90,'assets/img/iluminador-champagne.jpg',10),
        (11,'Primer Facial Blur','Primer que ajuda a suavizar a aparência dos poros antes da maquiagem.','Rosto',49.90,'assets/img/primer-blur.jpg',9),
        (12,'Fixador de Maquiagem','Bruma fixadora para ajudar a manter a maquiagem por mais tempo.','Rosto',45.90,'assets/img/fixador-maquiagem.jpg',12),
        (13,'Paleta de Sombras Nude','Paleta com tons neutros matte e cintilantes para diversas ocasiões.','Olhos',74.90,'assets/img/paleta-nude.jpg',8),
        (14,'Paleta de Sombras Colorida','Paleta com cores vibrantes e variadas para criar looks criativos.','Olhos',79.90,'assets/img/paleta-colorida.jpg',5),
        (15,'Máscara de Cílios Volume','Máscara para cílios que proporciona volume e definição.','Olhos',37.90,'assets/img/mascara-volume.jpg',15),
        (16,'Máscara de Cílios à Prova d’Água','Máscara resistente à água para cílios definidos por mais tempo.','Olhos',42.90,'assets/img/mascara-prova-agua.jpg',10),
        (17,'Delineador Líquido Preto','Delineador de ponta fina para traços precisos e acabamento intenso.','Olhos',29.90,'assets/img/delineador-preto.jpg',13),
        (18,'Lápis de Olho Preto','Lápis macio para delinear a linha dos cílios ou a linha d’água.','Olhos',19.90,'assets/img/lapis-olho.jpg',18),
        (19,'Lápis para Sobrancelha','Lápis para preencher e definir as sobrancelhas com aparência natural.','Olhos',24.90,'assets/img/lapis-sobrancelha.jpg',12),
        (20,'Gel Incolor para Sobrancelhas','Gel transparente para pentear e manter as sobrancelhas alinhadas.','Olhos',27.90,'assets/img/gel-sobrancelha.jpg',11),
        (21,'Quarteto de Sombras Marrom','Quarteto compacto de sombras em tons marrons versáteis.','Olhos',39.90,'assets/img/quarteto-marrom.jpg',8),
        (22,'Glitter para Maquiagem Dourado','Glitter cosmético dourado para criar pontos de brilho na maquiagem.','Olhos',22.90,'assets/img/glitter-dourado.jpg',7),
        (23,'Cílios Postiços Naturais','Cílios postiços leves para realçar o olhar com efeito natural.','Olhos',26.90,'assets/img/cilios-naturais.jpg',10),
        (24,'Cola para Cílios Transparente','Cola transparente para aplicação de cílios postiços.','Olhos',18.90,'assets/img/cola-cilios.jpg',14),
        (25,'Batom Matte Vermelho','Batom matte com cor intensa e aplicação confortável.','Lábios',34.90,'assets/img/batom-vermelho.jpg',12),
        (26,'Batom Cremoso Nude','Batom cremoso em tom nude para usar no dia a dia.','Lábios',32.90,'assets/img/batom-nude.jpg',10),
        (27,'Gloss Labial Transparente','Gloss transparente para dar brilho aos lábios sozinho ou sobre o batom.','Lábios',24.90,'assets/img/gloss-transparente.jpg',16),
        (28,'Gloss Labial Rosé','Gloss rosé com brilho delicado e textura confortável.','Lábios',26.90,'assets/img/gloss-rose.jpg',13),
        (29,'Lápis Labial Nude','Lápis para contornar os lábios e ajudar a definir o batom.','Lábios',19.90,'assets/img/lapis-labial-nude.jpg',11),
        (30,'Lip Tint Cereja','Tint labial de cor cereja com acabamento leve e natural.','Lábios',29.90,'assets/img/lip-tint-cereja.jpg',9),
        (31,'Balm Labial Hidratante','Balm para hidratar e proteger os lábios no dia a dia.','Lábios',17.90,'assets/img/balm-labial.jpg',18),
        (32,'Paleta de Batons','Paleta compacta com diferentes tons para os lábios.','Lábios',54.90,'assets/img/paleta-batons.jpg',6),
        (33,'Esponja para Maquiagem','Esponja macia para aplicar base, corretivo e outros produtos cremosos.','Acessórios',16.90,'assets/img/esponja-maquiagem.jpg',20),
        (34,'Kit com 5 Pincéis para Rosto','Kit de pincéis para aplicar base, pó, blush, contorno e iluminador.','Acessórios',59.90,'assets/img/kit-pinceis-rosto.jpg',8),
        (35,'Kit com 8 Pincéis para Olhos','Pincéis para aplicar e esfumar sombras com precisão.','Acessórios',49.90,'assets/img/kit-pinceis-olhos.jpg',9),
        (36,'Pincel para Base','Pincel de cerdas macias para aplicação uniforme de base.','Acessórios',29.90,'assets/img/pincel-base.jpg',10),
        (37,'Pincel para Blush','Pincel macio para aplicar blush e produtos em pó.','Acessórios',24.90,'assets/img/pincel-blush.jpg',12),
        (38,'Curvador de Cílios','Acessório para curvar os cílios antes da aplicação da máscara.','Acessórios',22.90,'assets/img/curvador-cilios.jpg',7),
        (39,'Apontador Duplo de Maquiagem','Apontador com dois tamanhos para lápis de maquiagem.','Acessórios',12.90,'assets/img/apontador-duplo.jpg',15),
        (40,'Necessaire de Maquiagem','Necessaire compacta para guardar e transportar produtos de maquiagem.','Acessórios',39.90,'assets/img/necessaire.jpg',8),
        (41,'Espelho de Bolsa','Espelho compacto para levar na bolsa e retocar a maquiagem.','Acessórios',14.90,'assets/img/espelho-bolsa.jpg',13),
        (42,'Demaquilante Bifásico','Demaquilante para remover maquiagem, inclusive produtos resistentes à água.','Cuidados',32.90,'assets/img/demaquilante-bifasico.jpg',10),
        (43,'Água Micelar','Água micelar para ajudar a limpar e remover resíduos da pele.','Cuidados',27.90,'assets/img/agua-micelar.jpg',12),
        (44,'Lenços Demaquilantes','Lenços práticos para remover maquiagem e limpar a pele.','Cuidados',19.90,'assets/img/lencos-demaquilantes.jpg',14),
        (45,'Hidratante Facial Pré-Maquiagem','Hidratante facial leve para preparar a pele antes da maquiagem.','Cuidados',39.90,'assets/img/hidratante-facial.jpg',9),
        (46,'Protetor Solar Facial com Cor','Protetor facial com cor para usar sozinho ou como base leve.','Cuidados',54.90,'assets/img/protetor-com-cor.jpg',7),
        (47,'Sérum Facial Iluminador','Sérum facial leve para complementar a rotina de cuidados com a pele.','Cuidados',49.90,'assets/img/serum-iluminador.jpg',6),
        (48,'Lenço Removedor de Oleosidade','Lenços para remover o excesso de oleosidade sem retirar a maquiagem.','Cuidados',15.90,'assets/img/lencos-oleosidade.jpg',11),
        (49,'Kit Maquiagem para Iniciantes','Kit com itens básicos para criar uma maquiagem completa.','Kits',99.90,'assets/img/kit-maquiagem-iniciante.jpg',5);
`;

async function criar_tabelas() {
    const connection = await db.pool.getConnection();
    try {
        await connection.beginTransaction();

        console.log("Criando tabela 'cliente'...");
        await connection.query(ESTRUTURA_CLIENTE);
        await connection.query(DADOS_CLIENTE);

        console.log("Criando tabela 'produto'...");
        await connection.query(ESTRUTURA_PRODUTO);
        await connection.query(DADOS_PRODUTO);         

        await connection.commit();
        console.log("Migration executada com sucesso!");
        process.exit(0);
    } catch (error) {
        await connection.rollback();
        console.log(error)
        process.exit(1);
    } finally {
        connection.release();
    }
}
criar_tabelas()