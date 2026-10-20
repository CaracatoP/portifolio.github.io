import type { ComponentType } from 'react'
import {
  siClaude, siCloudflare, siElectron, siExpress, siMongodb, siN8n, siNextdotjs, siNodedotjs, siPix,
  siPostgresql, siPython, siRailway, siReact, siSupabase, siTailwindcss, siTypescript, siVercel, siVite,
  type SimpleIcon,
} from 'simple-icons'
import { TapLinkMock } from '@/components/mockups/taplink'
import { InvestHubMock } from '@/components/mockups/investhub'
import { ChatMock } from '@/components/mockups/chat'
import { ServerMock } from '@/components/mockups/server'

export const contact = {
  email: 'joaogabrielcaracato@gmail.com',
  whatsapp: 'https://wa.me/5544997370903',
  whatsappLabel: '(44) 99737-0903',
  github: 'https://github.com/CaracatoP',
  linkedin: 'https://www.linkedin.com/in/joaogabrielcaracato',
  instagram: 'https://www.instagram.com/caracato_',
}

export type Project = {
  id: string
  name: string
  status: 'Em produção' | 'Em desenvolvimento' | 'Ativo'
  summary: string
  features: string[]
  stack: string[]
  links: { label: string; href: string }[]
  Mock: ComponentType
}

export const projects: Project[] = [
  {
    id: 'taplink',
    name: 'TapLink',
    status: 'Em produção',
    summary: 'SaaS multi-tenant para criar e gerenciar sites comerciais. Várias empresas na mesma infraestrutura, cada uma com seus dados isolados.',
    features: [
      'Isolamento de dados por tenant',
      'Painel administrativo e painel do cliente',
      'Catálogo, carrinho e checkout',
      'Pagamentos com Asaas e Pix',
      'Pedidos, estoque e financeiro',
    ],
    stack: ['Multi-tenant', 'Asaas', 'Pix', 'Vercel', 'Railway'],
    links: [{ label: 'Abrir o TapLink', href: 'https://taplinkapp.vercel.app' }],
    Mock: TapLinkMock,
  },
  {
    id: 'investhub',
    name: 'InvestHub',
    status: 'Em produção',
    summary: 'Plataforma para gerenciar e acompanhar investimentos, com a carteira inteira num lugar só.',
    features: ['Dashboards e visão da carteira', 'Gráficos e indicadores financeiros', 'Projeções', 'Integrações externas'],
    stack: ['React', 'TypeScript', 'Tailwind', 'Node.js', 'MongoDB'],
    links: [
      { label: 'Abrir', href: 'https://investment-dashboard-client.vercel.app' },
      { label: 'Código', href: 'https://github.com/CaracatoP/InvestmentDashboard' },
    ],
    Mock: InvestHubMock,
  },
  {
    id: 'atendimento',
    name: 'Atendimento com IA',
    status: 'Em desenvolvimento',
    summary: 'SaaS de atendimento, agendamento e vendas automatizadas pelo WhatsApp, para empresas automatizarem o relacionamento com clientes.',
    features: [
      'Atendimento automatizado 24 horas',
      'Agendamentos e gestão de horários',
      'Qualificação de leads e automação de vendas',
      'Follow-up e recuperação de oportunidades',
      'Reativação de clientes',
    ],
    stack: ['n8n', 'Evolution API', 'Supabase', 'Calendários'],
    links: [],
    Mock: ChatMock,
  },
  {
    id: 'shinobicraft',
    name: 'ShinobiCraft',
    status: 'Ativo',
    summary: 'Servidores Minecraft com a infraestrutura em volta: painel administrativo, permissões, autenticação, plugins, mods e automações.',
    features: [
      'Gerenciamento com Crafty Controller',
      'Painel admin com autenticação',
      'Sistema de permissões, plugins e mods',
      'Launcher próprio em Electron',
      'Domínios, hospedagem e automações',
    ],
    stack: ['Next.js', 'Electron', 'n8n', 'Cloudflare'],
    links: [{ label: 'Launcher no GitHub', href: 'https://github.com/CaracatoP/ShinobiCraft2' }],
    Mock: ServerMock,
  },
]

export const moreProjects = [
  { name: 'Kagetsu', text: 'Bot de Discord multi-servidor com painel em Next.js: XP, cargos, tickets e moderação.', href: 'https://github.com/CaracatoP/kagetsu-bot' },
  { name: 'AutoWhats', text: 'Automação de WhatsApp em Python para tarefas repetitivas.', href: 'https://github.com/CaracatoP/AutoWhats' },
]

export type Tech = { name: string; icon?: SimpleIcon }

export const marquee: Tech[] = [
  { name: 'React', icon: siReact },
  { name: 'Next.js', icon: siNextdotjs },
  { name: 'TypeScript', icon: siTypescript },
  { name: 'Tailwind CSS', icon: siTailwindcss },
  { name: 'Vite', icon: siVite },
  { name: 'Node.js', icon: siNodedotjs },
  { name: 'MongoDB', icon: siMongodb },
  { name: 'PostgreSQL', icon: siPostgresql },
  { name: 'Supabase', icon: siSupabase },
  { name: 'n8n', icon: siN8n },
  { name: 'Vercel', icon: siVercel },
  { name: 'Railway', icon: siRailway },
  { name: 'Cloudflare', icon: siCloudflare },
  { name: 'Pix', icon: siPix },
  { name: 'Claude Code', icon: siClaude },
]

export const stackGroups: { title: string; text: string; items: Tech[] }[] = [
  {
    title: 'Front-end',
    text: 'Interfaces responsivas, rápidas e com acabamento de produto.',
    items: [
      { name: 'React', icon: siReact },
      { name: 'Next.js', icon: siNextdotjs },
      { name: 'TypeScript', icon: siTypescript },
      { name: 'Tailwind', icon: siTailwindcss },
      { name: 'Electron', icon: siElectron },
    ],
  },
  {
    title: 'Back-end e dados',
    text: 'APIs, autenticação e modelagem com isolamento de dados.',
    items: [
      { name: 'Node.js', icon: siNodedotjs },
      { name: 'Express', icon: siExpress },
      { name: 'MongoDB', icon: siMongodb },
      { name: 'PostgreSQL', icon: siPostgresql },
      { name: 'Supabase', icon: siSupabase },
    ],
  },
  {
    title: 'Automação',
    text: 'Fluxos que conectam sistemas e trabalham 24 horas.',
    items: [
      { name: 'n8n', icon: siN8n },
      { name: 'Evolution API' },
      { name: 'Python', icon: siPython },
      { name: 'Claude Code', icon: siClaude },
    ],
  },
  {
    title: 'Infra e pagamentos',
    text: 'Deploy, domínios e operações financeiras confiáveis.',
    items: [
      { name: 'Vercel', icon: siVercel },
      { name: 'Railway', icon: siRailway },
      { name: 'Cloudflare', icon: siCloudflare },
      { name: 'Asaas e Pix', icon: siPix },
    ],
  },
]

export const steps = [
  ['Entender', 'Objetivo e contexto do projeto antes da primeira linha.'],
  ['Investigar', 'Ler o código existente e achar a causa raiz.'],
  ['Mapear impacto', 'Dependências, riscos e o que não pode quebrar.'],
  ['Implementar', 'A menor mudança correta, sem refatorar o que não é da tarefa.'],
  ['Testar', 'Verificações direcionadas no que mudou.'],
  ['Reportar', 'O que foi alterado, limitações e riscos.'],
] as const

export const principles = [
  ['Segurança é requisito', 'Permissões, autenticação, isolamento de dados e validação de entrada desde o começo.'],
  ['Sem gambiarra', 'Correção definitiva e fundamentada, não algo que só esconde o problema.'],
  ['Preservar o que funciona', 'Sem regressões, reaproveitando componentes e a arquitetura existentes.'],
] as const
