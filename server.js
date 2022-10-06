import inquirer from 'inquirer'
import chalk from 'chalk'

import fs from 'fs'
import { parse } from 'path'

operation()

function operation() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: [
          'Criar Conta',
          'Consultar Saldo',
          'Depositar',
          'Sacar',
          'Sair'
        ]
      }
    ])
    .then(answer => {
      const action = answer['action']

      if (action === 'Criar Conta') {
        createAccount()
      } else if (action === 'Depositar') {
        deposit()
      } else if (action === 'Consultar Saldo') {
        getAccountBalance()
      } else if (action === 'Sacar') {
        widthDraw()
      } else if (action === 'Sair') {
        console.log(chalk.black('Obrigado por usar o Accounts'))
        process.exit()
      }
    })
    .catch(err => console.log(err))
}

// create account

function createAccount() {
  console.log(chalk.bgGreen.black('Obrigado por escolher o nosso banco!'))
  console.log(chalk.green('Defina as opções da sua conta a seguir:'))

  buildAccount()
}

function buildAccount() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Digite um nome para sua conta:'
      }
    ])
    .then(answer => {
      const accountName = answer['accountName']

      console.log(accountName)

      if (!fs.existsSync('accounts')) {
        fs.mkdirSync('accounts')
      }

      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRed.black('Essa conta já existe, escolha outro nome!')
        )
        buildAccount()
        return
      }

      fs.writeFile(
        `accounts/${accountName}.json`,
        '{"balance": 0}',
        function (err) {
          console.log(err)
        }
      )

      console.log(chalk.green('Parabéns sua conta foi criada!'))
      operation()
    })
    .catch(err => console.error(err))
}

//

function deposit() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Qual o nome da sua conta?'
      }
    ])
    .then(answer => {
      const accountName = answer['accountName']

      //verify if account exist
      if (!checkAccount(accountName)) {
        return deposit()
      }

      inquirer
        .prompt([
          {
            name: 'amount',
            message: 'Quanto você deseja depositar?'
          }
        ])
        .then(answer => {
          const amount = answer['amount']

          // add an amount
          addAmount(accountName, amount)

          operation()
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log('Essa conta não existe!')
    return false
  }

  return true
}

function addAmount(accountName, amount) {
  const accountData = getAccount(accountName)

  if (!amount) {
    console.log(
      chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!')
    )
    return deposit()
  }

  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err)
    }
  )

  console.log(chalk.green(`Foi depositado o valor de R${amount} na sua conta!`))
}

function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: 'utf8',
    flag: 'r'
  })

  return JSON.parse(accountJSON)
}

// show account balance
function getAccountBalance() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Qual o nome da sua conta?'
      }
    ])
    .then(answer => {
      const accountName = answer['accountName']

      // verify if account exists
      if (!checkAccount(accountName)) {
        return getAccountBalance()
      }

      const accountData = getAccount(accountName)

      console.log(`Olá, o slado da sua conta é de R${accountData.balance}`)

      operation()
    })
    .catch(err => console.log(err))
}

// widthDraw an amount from user account
function widthDraw() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Qual o nome da sua conta?'
      }
    ])
    .then(answer => {
      const accountName = answer['accountName']

      if (!checkAccount(accountName)) {
        return widthDraw()
      }

      inquirer
        .prompt([
          {
            name: 'amount',
            message: 'Quanto você deseja sacar?'
          }
        ])
        .then(answer => {
          const amount = answer['amount']

          removeAmount(accountName, amount)
        })
        .catch()
    })
    .catch()
}

function removeAmount(accountName, amount) {
  const accountData = getAccount(accountName)

  if (!amount) {
    console.log(
      chalk.bgRed.black('Ocorreu um erro tente novamente mais tarde!')
    )
    return widthDraw()
  }

  if (accountData.balance < amount) {
    console.log('Valor indisponível!')
    return widthDraw()
  }

  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)
}
