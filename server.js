import inquirer from 'inquirer'
import chalk from 'chalk'

import fs from 'fs'

operation()

function operation() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: [
          'Criar conta',
          'Consultar Saldo',
          'Depositar',
          'Sacar',
          'Sair'
        ]
      }
    ])
    .then(answer => {
      const action = answer['action']

      console.log(action)
    })
    .catch(err => console.log(err))
}

// create account

function createAccount() {
  console.log(chalk.bgGreen.black('Obrigado por escolher o nosso banco!'))
  console.log(chalk.green('Defina as opções da sua conta a seguir:'))
}
