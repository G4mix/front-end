import styles from "./styles.module.css";

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Política de Privacidade – Plataforma Gamix
        </h1>
        <p className={styles.subtitle}>Última atualização: 13 de junho de 2025</p>

        <p className={styles.paragraph}>
          Bem-vindo à Gamix! Esta Política de Privacidade tem o objetivo de
          informar de forma transparente como coletamos, utilizamos,
          armazenamos, protegemos e compartilhamos os seus dados pessoais. Ao
          utilizar a plataforma, você concorda com os termos aqui estabelecidos,
          que estão em total conformidade com a Lei Geral de Proteção de Dados
          Pessoais – LGPD (Lei nº 13.709/2018) e demais normas aplicáveis.
        </p>

        <h2 className={styles.sectionTitle}>1. Definições</h2>
        <p className={styles.paragraph}>
          Para fins desta Política, aplicam-se as seguintes definições:
        </p>
        <ul className={styles.list}>
          <li>
            <strong>Dados Pessoais:</strong> informações que permitem
            identificar ou tornar identificável uma pessoa física, como nome,
            e-mail, CPF, localização, entre outros.
          </li>
          <li>
            <strong>Dados Sensíveis:</strong> dados pessoais sobre origem
            racial, convicção religiosa, opinião política, saúde, orientação
            sexual, biometria ou dados genéticos.
          </li>
          <li>
            <strong>Usuário:</strong> qualquer pessoa que utiliza a plataforma
            Gamix.
          </li>
          <li>
            <strong>Controlador:</strong> a pessoa natural ou jurídica que toma
            as decisões sobre o tratamento de dados pessoais – neste caso, a
            equipe gestora da Gamix.
          </li>
          <li>
            <strong>Operador:</strong> a pessoa natural ou jurídica que realiza
            o tratamento de dados pessoais em nome do controlador.
          </li>
          <li>
            <strong>Base Legal:</strong> fundamento jurídico que autoriza o
            tratamento de dados, como consentimento, execução de contrato,
            cumprimento de obrigação legal, entre outros.
          </li>
        </ul>

        <h2 className={styles.sectionTitle}>2. Coleta de Dados</h2>

        <h3 className={styles.subsectionTitle}>
          Dados fornecidos pelo usuário:
        </h3>
        <ul className={styles.list}>
          <li>Nome completo</li>
          <li>Nome de exibição (username)</li>
          <li>E-mail</li>
          <li>Senha (armazenada de forma criptografada)</li>
          <li>Foto ou ícone de perfil (opcional)</li>
          <li>
            Conteúdo publicado (textos, vídeos, imagens, links, códigos)
          </li>
          <li>Portfólio profissional e descrições técnicas</li>
        </ul>

        <h3 className={styles.subsectionTitle}>
          Dados coletados automaticamente:
        </h3>
        <ul className={styles.list}>
          <li>Endereço IP</li>
          <li>Tipo de dispositivo e navegador</li>
          <li>
            Informações de navegação e interações na plataforma (Google
            Analytics e Microsoft Clarity)
          </li>
          <li>Dados de localização aproximada (quando autorizados)</li>
        </ul>

        <h2 className={styles.sectionTitle}>3. Uso dos Dados</h2>
        <p className={styles.paragraph}>
          Os dados pessoais são utilizados para as seguintes finalidades:
        </p>
        <ul className={styles.list}>
          <li>Criar e manter o perfil do usuário na plataforma</li>
          <li>
            Permitir acesso e uso das funcionalidades (como postagens,
            comentários e feedbacks)
          </li>
          <li>
            Proporcionar conexões entre usuários com perfis complementares
          </li>
          <li>
            Realizar sugestões de colaboração baseadas em interesses e
            interações
          </li>
          <li>
            Avaliar o desempenho de projetos e grupos (relatórios de
            produtividade)
          </li>
          <li>
            Exibir conteúdos em destaque e realizar divulgação interna
          </li>
          <li>
            Promover comunicações relacionadas à plataforma, notificações
            técnicas e novidades
          </li>
          <li>
            Aprimorar a segurança da aplicação, prevenindo fraudes e acessos
            não autorizados
          </li>
        </ul>

        <h2 className={styles.sectionTitle}>4. Compartilhamento</h2>
        <p className={styles.paragraph}>
          A Gamix não vende nem compartilha os dados dos usuários com terceiros
          para fins comerciais externos. O compartilhamento de dados poderá
          ocorrer nos seguintes casos, sempre com base legal:
        </p>
        <ul className={styles.list}>
          <li>
            Prestadores de serviço (como serviços de hospedagem e armazenamento
            em nuvem)
          </li>
          <li>Parceiros técnicos para viabilizar funcionalidades específicas</li>
          <li>
            Cumprimento de obrigação legal ou judicial, mediante ordem de
            autoridade competente
          </li>
          <li>Análises estatísticas e relatórios, desde que anonimizados</li>
        </ul>
        <p className={styles.paragraph}>
          A eventual transferência internacional de dados ocorrerá apenas para
          países com grau de proteção compatível com a LGPD, mediante garantias
          adequadas.
        </p>

        <h2 className={styles.sectionTitle}>5. Armazenamento e Segurança</h2>
        <p className={styles.paragraph}>
          Adotamos medidas rigorosas para proteger os dados pessoais
          armazenados:
        </p>
        <ul className={styles.list}>
          <li>
            Armazenamento em servidores com monitoramento, backup e replicação
            em zonas seguras
          </li>
          <li>
            Hospedagem com provedores especializados e infraestrutura em nuvem
          </li>
          <li>Criptografia de senhas</li>
          <li>Comunicação entre cliente e servidor protegida por HTTPS</li>
          <li>Autenticação com verificação de permissões</li>
          <li>
            Políticas de acesso com privilégio mínimo (least privilege)
          </li>
          <li>
            Prevenção contra CSRF, XSS, injeções e ataques de força bruta
          </li>
          <li>Atualizações automáticas do sistema de segurança</li>
        </ul>

        <h2 className={styles.sectionTitle}>6. Direitos do Usuário</h2>
        <p className={styles.paragraph}>
          De acordo com a LGPD, você possui os seguintes direitos em relação aos
          seus dados:
        </p>
        <ul className={styles.list}>
          <li>Confirmação e acesso aos dados tratados pela plataforma</li>
          <li>Correção de dados incompletos, inexatos ou desatualizados</li>
          <li>
            Anonimização, bloqueio ou eliminação de dados desnecessários ou
            excessivos
          </li>
          <li>
            Portabilidade dos dados para outro fornecedor de serviço
          </li>
          <li>Revogação do consentimento, quando aplicável</li>
          <li>
            Eliminação dos dados pessoais tratados com base no consentimento
          </li>
          <li>
            Informação sobre as entidades com as quais os dados foram
            compartilhados
          </li>
          <li>Revisão de decisões automatizadas, quando houver</li>
        </ul>
        <p className={styles.paragraph}>
          Esses direitos podem ser exercidos mediante solicitação por e-mail:{" "}
          <a href="mailto:gamix-privacidade@gmail.com" className={styles.link}>
            gamix-privacidade@gmail.com
          </a>
        </p>

        <h2 className={styles.sectionTitle}>7. Cookies</h2>
        <p className={styles.paragraph}>
          A Gamix utiliza cookies e tecnologias de rastreamento para:
        </p>
        <ul className={styles.list}>
          <li>Autenticar o usuário</li>
          <li>Registrar preferências</li>
          <li>Medir estatísticas de navegação e engajamento</li>
          <li>Personalizar conteúdos e recomendações</li>
        </ul>
        <p className={styles.paragraph}>
          O usuário pode, a qualquer momento, configurar seu navegador para
          bloquear cookies ou alertar quando estiverem sendo utilizados. No
          entanto, isso pode comprometer a funcionalidade de certas partes da
          plataforma.
        </p>

        <h2 className={styles.sectionTitle}>8. Atualizações</h2>
        <p className={styles.paragraph}>
          A presente Política poderá ser atualizada periodicamente, a fim de
          refletir alterações na legislação, melhorias da plataforma ou ajustes
          operacionais. Em caso de mudanças substanciais, os usuários serão
          avisados por meio de notificações no aplicativo ou pelo e-mail
          cadastrado. O uso continuado da Gamix após tais alterações será
          considerado como aceitação tácita.
        </p>

        <h2 className={styles.sectionTitle}>9. Contato</h2>
        <p className={styles.paragraph}>
          Para qualquer dúvida, solicitação ou exercício de direitos
          relacionados a esta Política, entre em contato:
        </p>
        <p className={styles.paragraph}>
          📧{" "}
          <a href="mailto:gamix-privacidade@gmail.com" className={styles.link}>
            gamix-privacidade@gmail.com
          </a>
        </p>

        <p className={styles.paragraph}>
          A Gamix reafirma seu compromisso com a ética digital, a segurança da
          informação e a privacidade de seus usuários, promovendo um ambiente
          colaborativo, transparente e seguro para todos os participantes da
          comunidade de desenvolvimento de jogos.
        </p>

        <p className={styles.paragraph}>
          <strong>Agradecemos por fazer parte da comunidade Gamix!</strong>
        </p>
      </div>
    </div>
  );
}
