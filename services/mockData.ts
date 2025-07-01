
import { User, UserRole, TreeNode, ConflictCloudData, SystemModule } from '../types';

export const mockAdmin: User = {
  id: '1',
  name: 'Admin',
  email: 'admin@sistema.com',
  role: UserRole.ADMIN,
};

export const mockUser: User = {
  id: '2',
  name: 'Usuário Padrão',
  email: 'user@sistema.com',
  role: UserRole.USER,
};

export const mockUsers: User[] = [
  mockAdmin,
  mockUser,
  { id: '3', name: 'Ana Costa', email: 'ana.costa@sistema.com', role: UserRole.USER },
  { id: '4', name: 'Carlos Souza', email: 'carlos.souza@sistema.com', role: UserRole.USER },
];

export const currentRealityTreeData: TreeNode = {
  name: 'Margens de Lucro Baixas',
  type: 'ude',
  children: [
    {
      name: 'Custos de Produção Altos',
      type: 'ude',
      children: [
        {
          name: 'Ineficiência na Linha de Montagem',
          children: [
            { name: 'Equipamento Obsoleto', type: 'stable' },
            { name: 'Falta de Treinamento', type: 'stable' },
          ],
        },
        { name: 'Preço Elevado de Matéria-Prima', type: 'stable' },
      ],
    },
    {
      name: 'Vendas Insuficientes',
      type: 'ude',
      children: [
        {
          name: 'Marketing Ineficaz',
          type: 'stable',
        },
        {
          name: 'Concorrência Forte',
          type: 'stable',
        },
      ],
    },
  ],
};

export const prerequisiteTreeData: TreeNode = {
    name: 'Lançar Novo Produto',
    type: 'injection',
    children: [
        {
            name: 'Produto Desenvolvido e Testado',
            children: [
                { name: 'Protótipo Aprovado' },
                { name: 'Testes de Qualidade Concluídos' },
            ]
        },
        {
            name: 'Plano de Marketing Executado',
            children: [
                { name: 'Campanha de Anúncios Ativa' },
                { name: 'Material Promocional Criado' },
            ]
        },
        {
            name: 'Equipe de Vendas Treinada'
        }
    ]
};


export const conflictCloudData: ConflictCloudData = {
    objective: 'A. Ter uma equipe de desenvolvimento ágil e eficaz',
    requirements: {
        b: 'B. Entregar novas funcionalidades rapidamente',
        c: 'C. Manter alta qualidade de código e baixa dívida técnica',
    },
    prerequisites: {
        d: 'D. Priorizar velocidade de desenvolvimento',
        dPrime: "D'. Priorizar refatoração e testes extensivos",
    }
};

export const systemModules: SystemModule[] = [
    { id: 'mod1', name: 'Módulo de Autenticação', description: 'Gerencia o login e as permissões de usuário.', isActive: true },
    { id: 'mod2', name: 'Módulo de Faturamento', description: 'Processa pagamentos e gera faturas.', isActive: true },
    { id: 'mod3', name: 'Módulo de Relatórios', description: 'Gera relatórios de uso e performance.', isActive: false },
    { id: 'mod4', name: 'Módulo de Notificações', description: 'Envia e-mails e alertas para os usuários.', isActive: true },
];
