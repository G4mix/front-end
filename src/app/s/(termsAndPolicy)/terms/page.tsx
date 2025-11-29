import styles from "./styles.module.css";

export default function TermsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Termos de Uso – Plataforma Gamix</h1>
        <p className={styles.subtitle}>Última atualização: 23 de junho de 2025</p>

        <p className={styles.paragraph}>
          Bem-vindo à Gamix! Estes Termos de Uso regem o acesso e a utilização da nossa plataforma
          online voltada à comunidade de desenvolvedores de jogos, artistas, sound designers, investidores
          e entusiastas do setor. Ao utilizar a Gamix, você concorda com todos os termos e condições aqui descritos.
        </p>
        <p className={styles.paragraph}>
          Este documento tem por finalidade proteger os direitos do desenvolvedor e garantir uma experiência segura, colaborativa e produtiva para todos os usuários.
        </p>

        <h2 className={styles.sectionTitle}>1. Definições</h2>
        <p className={styles.paragraph}>
          Para fins deste documento, consideram-se as seguintes definições:
        </p>
        <ul className={styles.list}>
          <li><strong>Gamix:</strong> plataforma digital colaborativa para criação, divulgação e desenvolvimento de jogos.</li>
          <li><strong>Usuário:</strong> toda pessoa física ou jurídica que acessa e utiliza os serviços oferecidos.</li>
          <li><strong>Conteúdo:</strong> toda informação publicada pelo usuário, como textos, imagens, vídeos e códigos.</li>
          <li><strong>Serviço:</strong> funcionalidades como criação de postagens, portfólios, grupos, etc.</li>
          <li><strong>Administrador:</strong> responsável técnico e jurídico da plataforma.</li>
        </ul>

        <h2 className={styles.sectionTitle}>2. Uso da Plataforma</h2>
        <h3 className={styles.subsectionTitle}>2.1. Cadastro e Acesso</h3>
        <ul className={styles.list}>
          <li>O acesso à Gamix exige o cadastro do usuário, mediante fornecimento de informações verídicas.</li>
          <li>Usuários com menos de 18 anos devem utilizar a plataforma com autorização de seus responsáveis legais.</li>
        </ul>

        <h3 className={styles.subsectionTitle}>2.2. Permissões e Restrições</h3>
        <p className={styles.paragraph}>É vedado aos usuários:</p>
        <ul className={styles.list}>
          <li>Publicar conteúdos ofensivos, discriminatórios, ilegais ou que incitem ódio ou violência.</li>
          <li>Usar a plataforma para fins fraudulentos, ilícitos ou que infrinjam direitos de terceiros.</li>
          <li>Compartilhar dados de terceiros sem autorização legal expressa.</li>
          <li>Praticar engenharia reversa, tentativa de invasão ou uso indevido do sistema.</li>
        </ul>
        <p className={styles.paragraph}>
          O descumprimento de qualquer regra poderá resultar na suspensão ou exclusão da conta, sem prejuízo das medidas judiciais cabíveis.
        </p>

        <h2 className={styles.sectionTitle}>3. Direitos e Obrigações</h2>
        <h3 className={styles.subsectionTitle}>3.1. Do Usuário</h3>
        <p className={styles.paragraph}>O usuário se compromete a:</p>
        <ul className={styles.list}>
          <li>Utilizar a Gamix com respeito à comunidade e à legislação vigente;</li>
          <li>Manter seus dados atualizados;</li>
          <li>Responder pelo conteúdo que publicar e pelas interações realizadas na plataforma.</li>
        </ul>

        <h3 className={styles.subsectionTitle}>3.2. Da Plataforma</h3>
        <p className={styles.paragraph}>A Gamix compromete-se a:</p>
        <ul className={styles.list}>
          <li>Prover um ambiente estável, seguro e funcional;</li>
          <li>Adotar medidas de segurança para proteção de dados e acesso;</li>
          <li>Mediar, quando necessário, conflitos entre usuários dentro dos limites legais e técnicos.</li>
        </ul>

        <h2 className={styles.sectionTitle}>4. Propriedade Intelectual</h2>
        <ul className={styles.list}>
          <li>Todo o conteúdo criado por usuários pertence exclusivamente a seus autores.</li>
          <li>O usuário concede à Gamix uma licença não exclusiva, mundial e gratuita para exibição e promoção do conteúdo na plataforma, inclusive em áreas de destaque.</li>
          <li>A identidade visual, marca, logotipo, layout e código da plataforma Gamix são de propriedade exclusiva dos seus desenvolvedores, sendo vedado seu uso sem autorização expressa.</li>
        </ul>

        <h2 className={styles.sectionTitle}>5. Privacidade e Proteção de Dados</h2>
        <p className={styles.paragraph}>
          A Gamix trata os dados pessoais conforme a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018). Os principais pontos incluem:
        </p>
        <ul className={styles.list}>
          <li>Coleta de dados como nome, e-mail, dados de login e atividades na plataforma.</li>
          <li>Armazenamento seguro e criptografado para os dados.</li>
          <li>Compartilhamento apenas com parceiros essenciais (ex: serviços de nuvem).</li>
          <li>Os dados não serão vendidos, divulgados ou transferidos sem consentimento, salvo por obrigação legal.</li>
        </ul>
        <p className={styles.paragraph}>
          A qualquer momento, o usuário poderá solicitar a remoção, edição ou portabilidade de seus dados pessoais, conforme previsto na LGPD.
        </p>

        <h2 className={styles.sectionTitle}>6. Limitações de Responsabilidade</h2>
        <p className={styles.paragraph}>A Gamix não se responsabiliza por:</p>
        <ul className={styles.list}>
          <li>Conteúdo publicado pelos usuários;</li>
          <li>Perdas decorrentes de indisponibilidade temporária da plataforma;</li>
          <li>Danos causados por terceiros ou por uso indevido da conta do usuário;</li>
          <li>Contratos firmados entre usuários fora da plataforma.</li>
        </ul>
        <p className={styles.paragraph}>
          A equipe da Gamix trabalha continuamente para manter a segurança, integridade e qualidade do serviço, mas não garante funcionamento ininterrupto ou isento de falhas técnicas.
        </p>

        <h2 className={styles.sectionTitle}>7. Encerramento e Atualizações</h2>
        <h3 className={styles.subsectionTitle}>7.1. Encerramento de Conta</h3>
        <p className={styles.paragraph}>
          O usuário pode solicitar a exclusão de sua conta a qualquer momento. A Gamix reserva-se o direito de encerrar contas inativas ou que violem estes Termos de Uso, mediante notificação prévia, salvo em casos de infrações graves.
        </p>

        <h3 className={styles.subsectionTitle}>7.2. Atualizações dos Termos</h3>
        <p className={styles.paragraph}>
          Este documento poderá ser alterado a qualquer momento. Em caso de mudanças relevantes, os usuários serão notificados com antecedência razoável. O uso contínuo da plataforma após a notificação implicará aceitação das novas condições.
        </p>

        <h2 className={styles.sectionTitle}>8. Disposições Gerais</h2>
        <ul className={styles.list}>
          <li><strong>Legislação Aplicável:</strong> Este contrato é regido pelas leis da República Federativa do Brasil.</li>
          <li><strong>Validade:</strong> Caso alguma disposição seja considerada inválida ou inexequível, as demais continuarão em pleno vigor.</li>
          <li><strong>Comunicações:</strong> Todas as comunicações serão realizadas por meio do e-mail cadastrado pelo usuário ou por avisos no aplicativo.</li>
        </ul>

        <p className={styles.paragraph}>
          Para dúvidas ou sugestões, entre em contato pelo e-mail:{" "}
          <a href="mailto:gamix-contato@gmail.com" className={styles.link}>
            gamix-contato@gmail.com
          </a>
        </p>

        <p className={styles.paragraph}>
          <strong>Obrigado por fazer parte da comunidade Gamix!</strong>
        </p>
      </div>
    </div>
  );
}
