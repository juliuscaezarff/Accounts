import inquirer from 'inquirer'
import chalk from 'chalk'

import fs from 'fs'

function operation() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'O que você deseja fazer?',
      choices: ['Criar conta', 'Consultar Saldo', 'Depositar', 'Sacar', 'Sair']
    },
  ])
}
