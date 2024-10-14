'use strict';

// OBJETO QUE IRÁ ARMAZENAR TODOS AS INFORMAÇÕES DAS CONTAS
//OBJECT THAT WILL KEEP ALL THE INFORMATIONS ABOUT THE ACCOUNTS
const accounts = JSON.parse(localStorage.getItem('accounts')) || [];


// ELEMENTOS
// ELEMENTS
let currentAccount;
let currentExpense;
let currentCard;
let currentYear;
let currentMonth;
let currentInvoice;
let currentExpenses;
let expenseIn = false;
let expenseFixed = false;
let expenseVariable = false;
let expenseCreditCard = false;
let totalMonthlyExpenses = 0;
let totalPendingExpenses = 0;
const currentDate = new Date();


// FORMULÁRIO DE CADASTRO DAS CONTAS
// ACCOUNT REGISTER
const inputBankName = document.getElementById('input-bank-name');
const inputAccountHolder = document.getElementById('input-account-holder');
const inputCurrentBalance = document.getElementById('input-current-balance');
const btnCreateAccount = document.getElementById('btn-create-account');

//Modal do registro de uma conta nova
// ACCOUNT MODAL
const accountModal = document.getElementById('account-modal');
const accountModalBtnClose = document.getElementById('account-modal-close');
const accountModaltext = document.querySelector('.account__modal-text');
const accountOverlay = document.getElementById('account-overlay');


// Mensagem de aviso dos cards das contas cadastradas
// ACCOUNTS SPAN
const accountsContent = document.querySelector('.accounts__content');
const cardsContent = document.getElementById('cards-content');


//Painel superior direito que contem a data e o horário
// BALANCE INFO TEXT
const dateSpan = document.getElementById('date');
const timeSpan = document.getElementById('time');

//Painel superior esquerdo que contém as informações da conta ativa (nome do banco e o titular da conta)
// DATA OF ACTIVE ACCOUNT
const bankNameSpan = document.getElementById('bank-name');
const accountHolderSpan = document.getElementById('account-holder');

//Modal de edição (caso o usuário queria alterar o nome do banco ou do titular)
//ACCOUNT MODAL EDIT 
const accountModalEdit = document.getElementById('modal-edit-acc');
const accountModalEditBtnClose = document.getElementById('edit-acc-close');
const inputEditID = document.getElementById('edit-input-id');
const inputEditBankName = document.getElementById('edit-input-bank-name');
const inputEditAccHolder = document.getElementById('edit-input-account-holder');
const btnEditAcc = document.getElementById('btn-edit-acc');

// DELETE ACCOUNTS
const spanDeleteAcc = document.getElementById('delete-acc');

//Tela de fundo (blur)
// OVERLAY
const overlay = document.querySelector('.overlay');

//Painel com as informações do saldo atual, saldo final previsto, entrada, saida e resultado
// BALANCE
const currentValue = document.getElementById('value-current');
const expectedValue = document.getElementById('value-expected');
const valueIn = document.getElementById('value-in');
const valueOut = document.getElementById('value-out');
const valueResult = document.getElementById('value-result');

// CHOICE CARD => card de opções (entrada, pix, cartao de crédito...)
const cards = document.querySelectorAll('.choice__card');

//Formulário e tabela da entrada, despesa fixa, despesa variável....
const containerExpense = document.querySelectorAll('.container-expense');

//Botão para fechar o formulario e a tabela das despesas
const btnCloseExpense = document.querySelectorAll('.expense__close')

// TABLE IN FORM => INFORMAÇÕES DO FORMULÁRIO DE ENTRADA E TABELA
const inTable = document.getElementById('in-tbody');
const inTotal = document.getElementById('in-total-value');
const inDescription = document.getElementById('in-description');
const inValue = document.getElementById('in-value');
const inDate = document.getElementById('in-date');
const inBtn = document.getElementById('in-btn');

// FILTER IN
const filterInMonth = document.getElementById('filter-in-month');
const filterInYear = document.getElementById('filter-in-year');
const filterInBtn = document.getElementById('filter-in-btn');

// MODAL EDIT IN
const modalEditIn = document.getElementById('modal-edit-in');
const btnModalEditInClose = document.getElementById('edit-in-close');
const inputEditInId = document.getElementById('edit-input-in-id');
const inputEditInDescription = document.getElementById('edit-input-in-description');
const inputEditInValue = document.getElementById('edit-input-in-value');
const inputEditInDate = document.getElementById('edit-input-in-date');
const btnFormEditIn = document.getElementById('btn-form-edit-in');


// TABLE FIXED EXPENSE FORM => INFORMAÇÕES DO FORMULÁRIO DE ENTRADA E TABELA
const fixedTable = document.getElementById('fixed-tbody');
const fixedTotal = document.getElementById('fixed-total-value');
const fixedDescription = document.getElementById('fixed-description');
const fixedValue = document.getElementById('fixed-value');
const fixedDate = document.getElementById('fixed-date');
const fixedBtn = document.getElementById('fixed-btn');

// MODAL EDIT FIXED EXPENSE
const modalEditFe = document.getElementById('modal-edit-fe');
const btnModalEditFeClose = document.getElementById('edit-fe-close');
const inputEditFeId = document.getElementById('edit-input-fe-id');
const inputEditFeDescription = document.getElementById('edit-input-fe-description');
const inputEditFeValue = document.getElementById('edit-input-fe-value');
const btnFormEditFe = document.getElementById('btn-form-edit-fe');
const inputEditFeDate = document.getElementById('edit-input-fe-date');

// RADIO
const radioOptions = document.querySelectorAll('.form__box--radio-label');

// TABLE VARIABLE EXPENSE FORM => INFORMAÇÕES DO FORMULÁRIO DE DESPESAS VARIAVEIS
const variableTable = document.getElementById('ve-tbody');
const variableTotal = document.getElementById('ve-total-value');
const variableDescription = document.getElementById('ve-description');
const variableValue = document.getElementById('ve-value');
const variableBtn = document.getElementById('ve-btn');

// FILTER VARIABLE EXPENSE
const filterVeMonth = document.getElementById('filter-ve-month');
const filterVeYear = document.getElementById('filter-ve-year');
const filterVeBtn = document.getElementById('filter-ve-btn');

// MODAL EDIT VARIABLE EXPENSE
const modalEditVe = document.getElementById('modal-edit-ve');
const btnModalEditVeClose = document.getElementById('edit-ve-close');
const inputEditVeId = document.getElementById('edit-input-ve-id');
const inputEditVeDescription = document.getElementById('edit-input-ve-description');
const inputEditVeValue = document.getElementById('edit-input-ve-value');
const btnFormEditVe = document.getElementById('btn-form-edit-ve');

// CREDIT CARD REGISTER CARD
const inputCcName = document.getElementById('input-cc-name');
const inputCcDueDate = document.getElementById('input-cc-due-date');
const inputCcInvoiceClosing = document.getElementById('input-cc-invoice-closing');
const btnCreateCc = document.getElementById('btn-create-cc');

// CREDIT CARD FORM (EXPENSE)
const inputCcHeading = document.getElementById('cc-heading');
const inputCcDescription = document.getElementById('input-cc-description');
const inputCcInstallmentValue = document.getElementById('input-cc-installment-value');
const inputCcInstalmentNumber = document.getElementById('input-cc-installment-number');
const inputCcDate = document.getElementById('input-cc-date');
const btnCreateExpenseCc = document.getElementById('btn-cc');

// CREDIT CARD TABLE
const creditCardTable = document.getElementById('cc-tbody');

// CREDIT CARD TABLE TOTAL VALUES
const ccSpanTotalMonth = document.getElementById('cc-span-total-month');
const ccSpanTotalCard = document.getElementById('cc-span-total-card');

// TABLE MONTHLY
const monthlyTable = document.getElementById('monthly-tbody');
const monthlyTotalValue = document.getElementById('monthly-total-value');

// INVOICE INFO
const invoiceModalInfo = document.getElementById('modal-invoice-info');
const invoiceModalInfoClose = document.getElementById('invoice-info-close');
const invoiceInfoHeading = document.getElementById('invoice-info-heading');
const invoiceTbody = document.getElementById('invoice-tbody');
const invoiceInfoTotal = document.getElementById('cc-span-total-invoice');

// INVOICE INFO
const ccModalInfo = document.getElementById('modal-cc-info');
const ccModalInfoClose = document.getElementById('cc-info-close');
const ccInfoHeading = document.getElementById('cc-info-heading');
const ccTbody = document.getElementById('cc-info-tbody');
const ccInfoTotal = document.getElementById('cc-span-total-info');

// TABLE PENDING EXPENSE
const peTable = document.getElementById('pe-tbody');
const peTotalValue = document.getElementById('pe-total-value');

// FILTER EXPENSES
const filterExpensesName = document.getElementById('filter-expenses-name');
const filterExpensesMonth = document.getElementById('filter-expenses-month');
const filterExpensesYear = document.getElementById('filter-expenses-year');
const filterExpensesBtn = document.getElementById('filter-expenses-btn');
const filterExpensesSpan = document.getElementById('filter-expenses-span');
const filterExpensesTable = document.getElementById('filter-tbody');

filterExpensesMonth.value = currentDate.getUTCMonth();
filterExpensesYear.value = currentDate.getUTCFullYear();

//STATISTIC YEARLY
const inYearly = document.getElementById('value-in--yearly');
const outYearly = document.getElementById('value-out--yearly');
const resultYearly = document.getElementById('value-result--yearly');
const inputStatisticYear = document.getElementById('filter-statistic-year');
const inMonths = document.querySelectorAll('.month-in');
const outMonths = document.querySelectorAll('.month-out');
const resultMonths = document.querySelectorAll('.month-result');

inputStatisticYear.value = currentDate.getUTCFullYear();


//FUNÇÃO REMOVER A CLASSE ATIVO DO BOTÃO RADIO
function removeActiveRadioClass() {
    radioOptions.forEach(radio => radio.classList.remove('radio-active'));
}

radioOptions.forEach(radio => {
    radio.addEventListener('click', () => {
        removeActiveRadioClass();
        radio.classList.add('radio-active');
    })
})



document.getElementById('cc-month-span').textContent = Intl.DateTimeFormat('pt-br', { month: "long" }).format(new Date());


btnCloseExpense.forEach((btn, i) => {
    btn.addEventListener('click', function () {
        containerExpense[i].classList.add('hidden');
    })
})


//Conferindo se existe uma conta registrada
if (accounts.length > 0) {
    currentAccount = accounts[0];
    accounts.forEach(account => {
        createAccountsCard(account);
    });

    bankNameSpan.textContent = currentAccount.bank;
    accountHolderSpan.textContent = currentAccount.accountHolder;

    if (currentAccount.expenses.length > 0) {
        createTableMonthly(currentAccount);
        createTablePending(currentAccount);
        updateStatisticYearly();
    }

    // -------------------- UPDATE INTERFACE TO THE USER --------------------
    updateBalance(currentAccount);
    updateTotalValueOfTable(currentAccount);
    updateStatisticYearly();
} else {
    accountsContent.innerHTML = '<span class="accounts__span">Não há nenhuma conta registrada!</span>';
    cardsContent.innerHTML = '<span class="cards__span">Não há nenhuma conta registrada!</span>';

    bankNameSpan.textContent = '';
    accountHolderSpan.textContent = '';
}


// FUNCTIONS
function hideAllContainers() {
    containerExpense.forEach((container) => {
        container.classList.add('hidden');
    })
}

// ------------------------ CARDS: ENTRADA, FE, VE e CC.... --------------------
cards.forEach((card, i) => {
    card.addEventListener('click', function () {
        if (currentAccount) {
            if (card.querySelector('.choice__heading').textContent === 'Pix') card.disabled = true;
            else {
                hideAllContainers();
                containerExpense[i].classList.remove('hidden');


                if (card.querySelector('.choice__heading').textContent === 'Entrada') {
                    switchActiveExpenseTableValue('in');
                    createTableIn(currentAccount);
                    filterInMonth.value = currentDate.getMonth();
                    filterInYear.value = currentDate.getFullYear();
                    inDate.value = formatDateInput();
                }
                if (card.querySelector('.choice__heading').textContent === 'Despesa fixa') {
                    switchActiveExpenseTableValue('fixed');
                    createTableFixed(currentAccount);
                    fixedDate.value = formatDateInput();
                }
                if (card.querySelector('.choice__heading').textContent === 'Despesa variável') {
                    switchActiveExpenseTableValue('variable');
                    createTableVariable(currentAccount);
                    filterVeMonth.value = currentDate.getMonth();
                    filterVeYear.value = currentDate.getFullYear();
                }

                if (card.querySelector('.choice__heading').textContent === 'Cartão de Crédito') {
                    switchActiveExpenseTableValue('cc');
                    inputCcDate.value = formatDateInput();

                    if (currentAccount.card.length > 0) {
                        currentCard = currentAccount.card[0];
                        currentAccount.card.forEach(card => createAccountsCreditCard(card));
                        updateInvoice();
                        inputCcHeading.textContent = currentCard.name;

                        if (currentCard.cc.length > 0) {
                            createTableCc(currentCard);
                        } else creditCardTable.innerHTML = '';
                    }

                }

                currentMonth = undefined;
                currentYear = undefined;
                currentExpense = undefined;
                updateTotalValueOfTable(currentAccount, currentMonth, currentYear);
            }
        }
    })
})

function formatDateInput() {
    const date = new Date();
    const year = date.getUTCFullYear();
    const Month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${Month}-${day}`;
}

const showAccountModal = function (text) {
    if (accountModal.classList.contains('hidden')) {
        accountModaltext.textContent = text;
        accountModal.classList.remove('hidden');
        accountOverlay.classList.remove('hidden');
    }
}


// ---------------------- LIST OF ACCOUNTS CREATED ----------------------

function createAccountsCard(acc) {
    // accountsSpan.classList.add('hidden');

    const div = document.createElement('div');
    div.classList.add('accounts__box');

    const btnBank = createBtnAccount(acc.bank, acc.id);
    div.appendChild(btnBank);

    const btnEdit = createBtnAccountEdit(acc.id);
    div.appendChild(btnEdit);

    accountsContent.appendChild(div);
}

function createBtnAccount(bankName, id) {
    const btn = document.createElement('button');
    btn.classList.add('accounts__btn', 'btn');
    btn.id = `${id}`;
    btn.textContent = `${bankName}`;

    //CHECKING IF THE BUTTON ID IS THE SAME AS THE CURRENT ACCOUNT ID

    if (+btn.id === currentAccount.id) {
        btn.classList.add('active');
    }

    btn.addEventListener('click', function () {
        // console.log('Está funcionando o clique do botão!');
        // ACCOUNT OF THE CURRENT BUTTON
        // console.log(accounts.find(acc => acc.id === id));
        currentAccount = accounts.find(acc => acc.id === +btn.id);

        bankNameSpan.textContent = currentAccount.bank;
        accountHolderSpan.textContent = currentAccount.accountHolder;

        if (+btn.id === currentAccount.id) {
            cleanCurrentAcc();
            btn.classList.add('active');
        }

        // ------------ UPDATE INTERFACE TO THE USER -----------------------
        updateBalance(currentAccount);
        updateTotalValueOfTable(currentAccount, currentMonth, currentYear);
        createTableIn(currentAccount);
        createTableMonthly(currentAccount);
        createTablePending(currentAccount);
        updateStatisticYearly();
        filterExpensesTable.innerHTML = '';
        filterExpensesName.value = '';
        filterExpensesMonth.value = currentDate.getUTCMonth();
        filterExpensesYear.value = currentDate.getUTCFullYear();
        filterExpensesSpan.classList.add('hidden');
    });

    return btn;
}

function createBtnAccountEdit(id) {
    const btn = document.createElement('button');
    btn.classList.add('accounts__btn', 'accounts__btn--icon', 'btn');
    btn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

    btn.addEventListener('click', function () {
        // console.log('Está funcionando o clique do botão de editar!');
        accountModalEdit.classList.remove('hidden');
        overlay.classList.remove('hidden');

        // ACCOUNT OF THE CURRENT BUTTON
        // console.log(accounts.find(acc => acc.id === id));
        const currentAccountEdit = accounts.find(acc => acc.id === id);
        inputEditID.value = currentAccountEdit.id;
        inputEditBankName.value = currentAccountEdit.bank;
        inputEditAccHolder.value = currentAccountEdit.accountHolder;
    });

    return btn;
}

function cleanCurrentAcc() {
    const allAccountsBtn = document.querySelectorAll('.accounts__btn');
    allAccountsBtn.forEach(btn => {
        btn.classList.remove('active');
    });
}

// ---------------------- END - LIST OF ACCOUNTS CREATED ----------------------


// ---------------------- LIST OF CARDS CREATED ----------------------

function createAccountsCreditCard(card) {
    const list = document.createElement('div');
    list.classList.add('cards__box');

    const btnCard = createBtnCreditCard(card.name, card.id);
    list.appendChild(btnCard);

    const btnEditCard = createBtnCreditCardDelete(card.id);
    list.appendChild(btnEditCard);

    cardsContent.appendChild(list);
}

function createBtnCreditCard(cardName, id) {
    const btn = document.createElement('button');
    btn.classList.add('cards__btn', 'btn');
    btn.id = `${id}`;
    btn.textContent = `${cardName}`;

    //CHECKING IF THE BUTTON ID IS THE SAME AS THE CURRENT ACCOUNT ID

    if (+btn.id === currentCard.id) {
        btn.classList.add('active');
    }

    btn.addEventListener('click', function () {
        console.log('Está funcionando o clique do botão!');
        // ACCOUNT OF THE CURRENT BUTTON
        // console.log(accounts.find(acc => acc.id === id));
        currentCard = currentAccount.card.find(card => card.id === id);
        inputCcHeading.textContent = currentCard.name;
        createTableCc(currentCard);

        currentExpense = undefined;

        if (+btn.id === currentCard.id) {
            cleanCurrentCreditCard();
            btn.classList.add('active');
        }

        // ------------ UPDATE INTERFACE TO THE USER -----------------------
        currentInvoice = undefined;
        currentExpenses = undefined;
        updateBalance(currentAccount);
        updateTotalValueOfTable(currentAccount, currentMonth, currentYear);
        createTableIn(currentAccount);
        updateInvoice();
    });

    return btn;
}

function createBtnCreditCardDelete(id) {
    const btn = document.createElement('button');
    btn.classList.add('cards__btn', 'cards__btn--icon', 'btn');
    btn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

    btn.addEventListener('click', function () {
        currentAccount.card.splice(currentAccount.card.findIndex(element => element.id === id), 1);

        currentAccount.expenses = currentAccount.expenses.filter(item => !(item.idCard === id));
        localStorage.setItem('accounts', JSON.stringify(accounts));

        // Update the page
        window.location.reload();

    });

    return btn;
}

function cleanCurrentCreditCard() {
    const allCreditCardsBtn = document.querySelectorAll('.cards__btn');
    allCreditCardsBtn.forEach(btn => {
        btn.classList.remove('active');
    });
}

// ---------------------- END - LIST OF CARDS CREATED ----------------------


// ---------------------- DATE AND MONEY FORMAT ----------------------

function dateFormat(date) {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'UTC'
    }

    if (date) {
        return Intl.DateTimeFormat('pt-br', options).format(new Date(date));
    } else {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }

        return Intl.DateTimeFormat('pt-br', options).format(currentDate);
    }

}

dateSpan.textContent = dateFormat();

function moneyFormat(value) {
    const options = {
        style: 'currency',
        currency: 'BRL',
    };

    return new Intl.NumberFormat('pt-br', options).format(value);
}

// ---------------------- END - DATE AND MONEY FORMAT ----------------------


// ---------------------- DISPLAY CLOCK ----------------------

const displayClock = function () {
    const clock = function () {
        const now = new Date();
        const hour = String(now.getHours()).padStart(2, 0);
        const min = String(now.getMinutes()).padStart(2, 0);
        const sec = String(now.getSeconds()).padStart(2, 0);

        timeSpan.textContent = `${hour}:${min}:${sec}`;
    }

    clock();
    setInterval(clock, 1000);
}

displayClock();

// ---------------------- END - DISPLAY CLOCK ----------------------


// ---------------------- TABLE IN ----------------------

function createTableIn(acc) {
    inTable.innerHTML = '';

    if (currentAccount) {
        if (acc.entries.length > 0) {
            acc.entries.filter(item => new Date(item.paymentDate).getMonth() === new Date().getMonth()).forEach(item => {
                const list = document.createElement('tr');
                list.dataset.in = item.id;
                list.innerHTML = `<td>${item.description}</td>
                <td>${moneyFormat(item.value)}</td>
                <td>${dateFormat(item.paymentDate)}</td>`;

                //Creating 'td' for status
                const tdStatus = document.createElement('td');
                const btnStatus = createBtnStatusIn(acc, item);
                tdStatus.appendChild(btnStatus);
                list.appendChild(tdStatus);

                //Creating 'td' for btn remove
                const tdRemove = document.createElement('td');
                const btnRemove = createBtnRemove(acc, item);
                tdRemove.appendChild(btnRemove);
                list.appendChild(tdRemove);

                //Creating 'td' for btn edit
                const tdEdit = document.createElement('td');
                const btnEdit = createBtnEdit(item);
                tdEdit.appendChild(btnEdit);
                list.appendChild(tdEdit);


                inTable.appendChild(list);
            })
        }
    }

}

function createBtnStatusIn(acc, item) {
    const btn = document.createElement('button');
    btn.classList.add('expense__btn', `${item.received ? 'expense__btn--received' : 'expense__btn--not-received'}`);
    btn.innerText = `${item.received ? 'sim' : 'não'}`;

    btn.addEventListener('click', function () {
        if (this.classList.contains('expense__btn--not-received')) {
            // this.classList.remove('expense__btn--not-received');
            // this.classList.add('expense__btn--received');
            // this.textContent = 'sim';

            item.received = 1;
            switchStatusIn(item);

            updateTotalValueOfTable(acc, currentMonth, currentYear);
            updateBalance(acc);

            localStorage.setItem('accounts', JSON.stringify(accounts));
        } else {
            // this.classList.add('expense__btn--not-received');
            // this.classList.remove('expense__btn--received');
            // this.textContent = 'não';

            item.received = 0;
            switchStatusIn(item);

            updateTotalValueOfTable(acc, currentMonth, currentYear);
            updateBalance(acc);

            localStorage.setItem('accounts', JSON.stringify(accounts));
        }
    });

    return btn;

}

// ---------------------- END - TABLE IN ----------------------


// ---------------------- TABLE MONTHLY ----------------------

function createTableMonthly(acc) {
    monthlyTable.innerHTML = '';
    if (currentAccount) {
        if (acc.card.length > 0) {
            const expenseInvoiceMonthly = [];

            acc.card.forEach(card => {
                if (card.invoice.length > 0) {
                    const searchExpenseMonthly = card.invoice.find(item => new Date(item.dueDate).getUTCMonth() === currentDate.getUTCMonth() && new Date(item.dueDate).getUTCFullYear() === currentDate.getUTCFullYear() && new Date(item.invoiceClosing).getUTCDate() < currentDate.getUTCDate() && new Date(item.invoiceClosing).getUTCFullYear() <= currentDate.getUTCFullYear());

                    if (searchExpenseMonthly) expenseInvoiceMonthly.push(searchExpenseMonthly);
                }
            })

            if (expenseInvoiceMonthly.length > 0) {
                checkExpenseInvoice(expenseInvoiceMonthly);
            }

        }

        if (acc.expenses.length > 0) {
            totalMonthlyExpenses = 0;

            acc.expenses.filter(item => new Date(item.dueDate).getUTCMonth() === currentDate.getUTCMonth() && new Date(item.dueDate).getUTCFullYear() === currentDate.getUTCFullYear()).forEach(item => {
                totalMonthlyExpenses += item.value;
                const list = document.createElement('tr');
                list.dataset.expense = item.id;
                list.innerHTML = `<td>${dateFormat(item.dueDate)}</td>
                <td>${item.description}</td>
                <td>${moneyFormat(item.value)}</td>`;

                //Creating 'td' for status
                const tdStatus = document.createElement('td');
                const btnStatus = createBtnStatusMonthly(acc, item);
                tdStatus.appendChild(btnStatus);
                list.appendChild(tdStatus);

                //Creating 'td' for btn remove
                const tdRemove = document.createElement('td');
                const btnRemove = createBtnRemoveExpense(acc, item);
                tdRemove.appendChild(btnRemove);
                list.appendChild(tdRemove);

                //Creating 'td' for btn edit
                const tdEdit = document.createElement('td');
                const btnEdit = createBtnEditMonthly(item);
                tdEdit.appendChild(btnEdit);
                list.appendChild(tdEdit);

                monthlyTable.appendChild(list);
            });

            // FILTRANDO AS DESPESAS VARIAVIES QUE A PROPRIEDADE É DIFERENTE
            acc.expenses.filter(item => new Date(item.paymentDate).getUTCMonth() === currentDate.getUTCMonth() && new Date(item.paymentDate).getUTCFullYear() === currentDate.getUTCFullYear()).forEach(item => {
                totalMonthlyExpenses += item.value;
                const list = document.createElement('tr');
                list.dataset.expense = item.id;
                list.innerHTML = `<td>${dateFormat(item.paymentDate)}</td>
                <td>${item.description}</td>
                <td>${moneyFormat(item.value)}</td>`;

                //Creating 'td' for status
                const tdStatus = document.createElement('td');
                const btnStatus = createBtnStatusMonthly(acc, item);
                tdStatus.appendChild(btnStatus);
                list.appendChild(tdStatus);

                //Creating 'td' for btn remove
                const tdRemove = document.createElement('td');
                const btnRemove = createBtnRemoveExpense(acc, item);
                tdRemove.appendChild(btnRemove);
                list.appendChild(tdRemove);

                //Creating 'td' for btn edit
                const tdEdit = document.createElement('td');
                const btnEdit = createBtnEditMonthly(item);
                tdEdit.appendChild(btnEdit);
                list.appendChild(tdEdit);


                monthlyTable.appendChild(list);
            });
        }



        monthlyTotalValue.textContent = moneyFormat(totalMonthlyExpenses);
    }

}

//  will check if the invoice already exist in the expenses global
function checkExpenseInvoice(card) {

    if (currentCard) {
        card.forEach(invoiceExpense => {
            //conferir se  a despesa existe na despesa global da conta do usuario
            let invoiceExist = currentAccount.expenses.find(item => item.idCard === invoiceExpense.idCard)

            if (invoiceExist) {
                let originalInvoice = currentAccount.card[invoiceExist.idCard].invoice[invoiceExist.idInvoice];
                invoiceExist.value = originalInvoice.value;

                if (originalInvoice.paid) {
                    originalInvoice.expenses.forEach(item => {
                        item.paid = 1;
                    });

                    if (currentExpense && currentExpense.type === 'cc') {
                        currentAccount.card[invoiceExist.idCard].expenses.find(expense => expense.idR === currentExpense.id && new Date(expense.dueDate).getUTCMonth() === currentDate.getUTCMonth() && new Date(expense.dueDate).getUTCFullYear() === currentDate.getUTCFullYear()).paid = 1;

                        currentAccount.card[invoiceExist.idCard].cc.find(expense => expense.id === currentExpense.id).installmentPaid += 1;
                    }

                    if (currentCard) createTableCc(currentCard);
                }



                updateBalance(currentAccount);
                updateTotalValueOfTable(currentAccount);
                // console.log('A despesa ja existe na despesa global');
                return;
            } else {
                // console.log('A despesa não existe na despesa global');

                const currentItemExpense = {
                    description: invoiceExpense.cardName,
                    value: invoiceExpense.value,
                    type: 'cc',
                    paid: 0,
                    dueDate: invoiceExpense.dueDate
                }

                currentItemExpense.idCard = invoiceExpense.idCard;
                currentItemExpense.idInvoice = invoiceExpense.id;
                currentItemExpense.id = currentAccount.expenses[currentAccount.expenses.length - 1] ? (currentAccount.expenses[currentAccount.expenses.length - 1]).id + 1 : 0;
                currentAccount.expenses.push(currentItemExpense);
            }

        })
    }
}

function createBtnStatusMonthly(acc, item, pending = false) {
    const btn = document.createElement('button');
    btn.classList.add('expense__btn', `${item.paid ? 'expense__btn--paid' : 'expense__btn--not-paid'}`);
    btn.innerText = `${item.paid ? 'pago' : 'não pago'}`;

    btn.addEventListener('click', function () {

        if (pending) {
            const tr = btn.closest('tr');
            if (tr) tr.remove();
        }

        if (item.type === 'cc') {

            if (this.classList.contains('expense__btn--not-paid')) {
                item.paid = 1;
                let invoice = currentAccount.card[item.idCard].invoice[item.idInvoice];
                invoice.paid = 1;
                invoice.expenses.forEach(expense => expense.paid = 1);
                switchStatusExpense(item);

                invoice.expenses.forEach(expense => {
                    currentAccount.card[invoice.idCard].cc.find(element => element.id === expense.idR).installmentPaid += 1;
                });

                invoice.expenses.forEach(expense => {
                    currentAccount.card[invoice.idCard].expenses.find(element => element.idR === expense.idR && element.installmentNumber === expense.installmentNumber).paid = 1;
                });


                currentAccount.card[invoice.idCard].cc.forEach(item => {
                    if (item.installmentNumber === item.installmentPaid) item.status = 1;
                    else item.status = 0;
                })

                if (currentCard) createTableCc(currentCard);
            } else {
                item.paid = 0;
                let invoice = currentAccount.card[item.idCard].invoice[item.idInvoice];
                invoice.paid = 0;
                invoice.expenses.forEach(expense => expense.paid = 0);
                switchStatusExpense(item);

                invoice.expenses.forEach(expense => {
                    let expenseCc = currentAccount.card[invoice.idCard].cc.find(element => element.id === expense.idR);
                    expenseCc.installmentPaid -= 1;
                    if (expenseCc.installmentPaid < 0) expenseCc.installmentPaid = 0;
                })

                invoice.expenses.forEach(expense => {
                    currentAccount.card[invoice.idCard].expenses.find(element => element.idR === expense.idR && element.installmentNumber === expense.installmentNumber).paid = 0;
                });


                currentAccount.card[invoice.idCard].cc.forEach(item => {
                    if (item.installmentNumber === item.installmentPaid) item.status = 1;
                    else item.status = 0;
                })

                if (currentCard) createTableCc(currentCard);
            }

        } else if (item.type === 've') { return; } else {
            if (this.classList.contains('expense__btn--not-paid')) {
                item.paid = 1;
                switchStatusExpense(item);

                updateTotalValueOfTable(acc, currentMonth, currentYear);
                updateBalance(acc);

                // localStorage.setItem('accounts', JSON.stringify(accounts));
            } else {
                item.paid = 0;
                switchStatusExpense(item);

                updateTotalValueOfTable(acc, currentMonth, currentYear);
                updateBalance(acc);
            }
        }

        localStorage.setItem('accounts', JSON.stringify(accounts));
    });

    return btn;

}

// ---------------------- END - TABLE MONTHLY ----------------------

// ---------------------- CHECK CC EXPENSES PAID ------------------
function checkCcExpensesPaid(invoice) {

}
// ---------------------- END -CHECK CC EXPENSES PAID ------------------

// ---------------------- SWITCH STATUS IN ----------------------
function switchStatusIn(expense) {
    if (expense.received) {
        const tr = document.querySelector(`[data-in = '${expense.id}']`);
        const btn = tr.querySelector('.expense__btn');
        btn.classList.remove('expense__btn--not-received');
        btn.classList.add('expense__btn--received');
        btn.textContent = 'sim';
        return;
    } else {
        const tr = document.querySelector(`[data-in = '${expense.id}']`);
        const btn = tr.querySelector('.expense__btn');
        btn.classList.add('expense__btn--not-received');
        btn.classList.remove('expense__btn--received');
        btn.textContent = 'não';
        return;
    }
}
// ---------------------- END - SWITCH STATUS IN ----------------------
// ---------------------- SWITCH STATUS IN ----------------------
function switchStatusExpense(expense) {
    if (expense.type === 'cc') {
        if (expense.paid) {
            const tr = document.querySelector(`[data-expense = '${expense.id}']`);
            const btn = tr.querySelector('.expense__btn');
            btn.classList.remove('expense__btn--not-paid');
            btn.classList.add('expense__btn--paid');
            btn.textContent = 'pago';
            updateBalance(currentAccount);
            return;
        } else {
            const tr = document.querySelector(`[data-expense = '${expense.id}']`);
            const btn = tr.querySelector('.expense__btn');
            btn.classList.add('expense__btn--not-paid');
            btn.classList.remove('expense__btn--paid');
            btn.textContent = 'não pago';
            updateBalance(currentAccount);
            // localStorage.setItem('accounts', JSON.stringify(accounts));
            return;
        }
    } else {
        if (expense.paid) {
            const tr = document.querySelector(`[data-expense = '${expense.id}']`);
            const btn = tr.querySelector('.expense__btn');
            btn.classList.remove('expense__btn--not-paid');
            btn.classList.add('expense__btn--paid');
            btn.textContent = 'pago';
            return;
        } else {
            const tr = document.querySelector(`[data-expense = '${expense.id}']`);
            const btn = tr.querySelector('.expense__btn');
            btn.classList.add('expense__btn--not-paid');
            btn.classList.remove('expense__btn--paid');
            btn.textContent = 'não pago';
            return;
        }
    }

}
// ---------------------- END - SWITCH STATUS IN ----------------------


// ---------------------- TABLE EXPENSE ----------------------
function createTableFixed(acc) {
    fixedTable.innerHTML = '';

    if (currentAccount) {
        if (acc.fe.length > 0) {
            acc.fe.filter(item => new Date(item.dueDate).getUTCMonth() === new Date().getUTCMonth()).forEach(item => {
                const list = document.createElement('tr');
                list.dataset.id = item.id;
                list.innerHTML = `<td>${item.description}</td>
                <td>${moneyFormat(item.value)}</td>
                <td>${dateFormat(item.dueDate)}</td>`;

                //Creating 'td' for renew
                const tdStatus = document.createElement('td');
                const btnStatus = createBtnRenew(item);
                tdStatus.appendChild(btnStatus);
                list.appendChild(tdStatus);

                //Creating 'td' for btn remove
                const tdRemove = document.createElement('td');
                const btnRemove = createBtnRemove(acc, item);
                tdRemove.appendChild(btnRemove);
                list.appendChild(tdRemove);

                //Creating 'td' for btn edit
                const tdEdit = document.createElement('td');
                const btnEdit = createBtnEdit(item);
                tdEdit.appendChild(btnEdit);
                list.appendChild(tdEdit);


                fixedTable.appendChild(list);
            })
        }
    }

}
// ---------------------- END - TABLE EXPENSE ----------------------


// ---------------------- TABLE VARIABLE ----------------------
function createTableVariable(acc) {
    variableTable.innerHTML = '';

    if (currentAccount) {
        if (acc.ve.length > 0) {
            acc.ve.forEach(item => {
                const list = document.createElement('tr');
                list.dataset.id = item.id;
                list.innerHTML = `<td>${item.description}</td>
                <td>${moneyFormat(item.value)}</td>
                <td>${dateFormat(item.paymentDate)}</td>`;

                //Creating 'td' for btn remove
                const tdRemove = document.createElement('td');
                const btnRemove = createBtnRemove(acc, item);
                tdRemove.appendChild(btnRemove);
                list.appendChild(tdRemove);

                //Creating 'td' for btn edit
                const tdEdit = document.createElement('td');
                const btnEdit = createBtnEdit(item);
                tdEdit.appendChild(btnEdit);
                list.appendChild(tdEdit);


                variableTable.appendChild(list);
            })
        }
    }

}
// ---------------------- END - TABLE VARIABLE ----------------------


// ---------------------- TABLE CREDIT CARD ----------------------

function createTableCc(curCard) {
    creditCardTable.innerHTML = '';

    if (curCard) {
        if (curCard.cc.length > 0) {
            curCard.cc.filter(item => item.status === 0).forEach(item => {
                const list = document.createElement('tr');
                list.dataset.cc = item.id;
                list.innerHTML = `<td>${dateFormat(item.purchaseDate)}</td>
                <td>${item.description}</td>
                <td>${moneyFormat(item.value)}</td>
                <td>${item.installmentNumber}</td>
                <td>${moneyFormat(item.installmentValue)}</td>
                <td>${item.installmentPaid}</td>`;

                //Creating 'td' for status
                const tdStatus = document.createElement('td');
                const btnStatus = createBtnStatusCc(curCard, item);
                tdStatus.appendChild(btnStatus);
                list.appendChild(tdStatus);

                //Creating 'td' for btn remove
                const tdRemove = document.createElement('td');
                const btnRemove = createBtnRemove(curCard, item);
                tdRemove.appendChild(btnRemove);
                list.appendChild(tdRemove);

                //Creating 'td' for btn edit
                const tdEdit = document.createElement('td');
                const btnEdit = createBtnEdit(item);
                tdEdit.appendChild(btnEdit);
                list.appendChild(tdEdit);


                creditCardTable.appendChild(list);
            })
        }
    }

}

function createBtnStatusCc(acc, item) {
    if (item.installmentPaid === item.installmentNumber) item.status = 1;
    else item.status = 0;

    const btn = document.createElement('button');
    btn.classList.add('expense__btn', `${item.status ? 'expense__btn--done' : 'expense__btn--waiting'}`);
    btn.innerText = `${item.status ? 'concluido' : 'em andamento'}`;

    btn.addEventListener('click', function () {
        ccTbody.innerHTML = '';

        let invoice = currentCard.expenses.filter(expense => expense.idR === item.id);

        invoice.forEach(item => {
            const list = document.createElement('tr');
            list.innerHTML = `
            <td>${dateFormat(item.dueDate)}</td>
            <td>${item.description}</td>
            <td>${moneyFormat(item.installmentValue)}</td>`;

            const btn = document.createElement('button');
            btn.classList.add('expense__btn', `${item.paid ? 'expense__btn--paid' : 'expense__btn--not-paid'}`);
            btn.innerText = `${item.paid ? 'pago' : 'não pago'}`;
            list.appendChild(btn);

            ccTbody.appendChild(list);
        })



        ccModalInfo.classList.remove('hidden');

        ccInfoTotal.textContent = moneyFormat(item.value)


    })

    return btn;
}

// ---------------------- END - TABLE CREDIT CARD ----------------------

// ---------------------- TABLE PENDING EXPENSE ----------------------
function createTablePending(acc) {
    peTable.innerHTML = '';
    if (currentAccount) {
        if (acc.card.length > 0) {
            const expenseInvoiceMonthly = [];

            acc.card.forEach(card => {
                if (card.invoice.length > 0) {
                    const searchExpenseMonthly = card.invoice.find(item => new Date(item.dueDate).getUTCMonth() < currentDate.getUTCMonth() && new Date(item.dueDate).getUTCFullYear() <= currentDate.getUTCFullYear() && new Date(item.invoiceClosing).getUTCDate() <= currentDate.getUTCDate() && new Date(item.invoiceClosing).getUTCFullYear() <= currentDate.getUTCFullYear() && !item.paid);

                    if (searchExpenseMonthly) expenseInvoiceMonthly.push(searchExpenseMonthly);
                }
            })

            if (expenseInvoiceMonthly.length > 0) {
                checkExpenseInvoice(expenseInvoiceMonthly);
            }

        }

        if (acc.expenses.length > 0) {
            totalPendingExpenses = 0;

            acc.expenses.filter(item => new Date(item.dueDate).getUTCMonth() < currentDate.getUTCMonth() && new Date(item.dueDate).getUTCFullYear() <= currentDate.getUTCFullYear() && !item.paid).forEach(item => {
                totalPendingExpenses += item.value;
                const list = document.createElement('tr');
                list.dataset.expense = item.id;
                list.innerHTML = `<td>${dateFormat(item.dueDate)}</td>
                <td>${item.description}</td>
                <td>${moneyFormat(item.value)}</td>`;

                //Creating 'td' for status
                const tdStatus = document.createElement('td');
                const btnStatus = createBtnStatusMonthly(acc, item, true);
                tdStatus.appendChild(btnStatus);
                list.appendChild(tdStatus);

                //Creating 'td' for btn remove
                const tdRemove = document.createElement('td');
                const btnRemove = createBtnRemoveExpense(acc, item);
                tdRemove.appendChild(btnRemove);
                list.appendChild(tdRemove);

                //Creating 'td' for btn edit
                const tdEdit = document.createElement('td');
                const btnEdit = createBtnEditMonthly(item);
                tdEdit.appendChild(btnEdit);
                list.appendChild(tdEdit);

                peTable.appendChild(list);
            });

        }


        peTotalValue.textContent = moneyFormat(totalPendingExpenses);
    }

}
// ---------------------- END - TABLE PENDING EXPENSE ----------------------

// ---------------------- BTN EDIT GLOBAL ----------------------
function createBtnEdit(expense) {
    const btn = document.createElement('button');
    btn.classList.add('expense__btn', 'expense__btn--edit');
    btn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';



    btn.addEventListener('click', function () {

        if (expense.type === 'in') {
            const dataIn = currentAccount.entries.find(item => item.id === expense.id);

            currentExpense = currentAccount.entries.find(item => item.id === expense.id);

            modalEditIn.classList.remove('hidden');
            overlay.classList.remove('hidden');

            inputEditInId.value = dataIn.id;
            inputEditInDescription.value = dataIn.description;
            inputEditInValue.value = dataIn.value;

            // Criar um objeto Date
            const dateObject = new Date(new Date(dataIn.paymentDate).getUTCFullYear(), new Date(dataIn.paymentDate).getUTCMonth(), new Date(dataIn.paymentDate).getUTCDate());
            // console.log(dateObject);

            // Obter a data no formato YYYY-MM-DD usando toLocaleDateString
            const options = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'UTC' };
            const datePart = dateObject.toLocaleDateString('en-CA', options).split('/').join('-');
            // console.log(datePart);

            inputEditInDate.value = datePart;
        } else if (expense.type === 'fe') {
            const dataFe = currentAccount.fe.find(item => item.id === expense.id);
            // console.log(dataFe);

            currentExpense = dataFe;

            modalEditFe.classList.remove('hidden');
            overlay.classList.remove('hidden');

            inputEditFeId.value = dataFe.id;
            inputEditFeDescription.value = dataFe.description;
            inputEditFeValue.value = dataFe.value;
            inputEditFeDate.value = new Date(dataFe.dueDate).getUTCDate();
        } else if (expense.type === 've') {

            // const dataVe = currentAccount.expenses.find(item => item.idR === expense.id && item.type === 've');
            const dataVe = currentAccount.ve.find(item => item.id === expense.id);
            currentExpense = dataVe;
            
            modalEditVe.classList.remove('hidden');

            inputEditVeId.value = currentExpense.id;
            inputEditVeDescription.value = currentExpense.description;
            inputEditVeValue.value = currentExpense.value;
    

            filterExpensesTable.innerHTML = '';
            filterExpensesName.value = '';
            filterExpensesMonth.value = currentDate.getUTCMonth();
            filterExpensesYear.value = currentDate.getUTCFullYear();
            filterExpensesSpan.classList.add('hidden');
            return;
        } else if (expense.type === 'cc') {


        }

    });


    return btn;
}
// ---------------------- END - BTN EDIT GLOBAL ----------------------

// ---------------------- BTN EDIT GLOBAL ----------------------
function createBtnEditMonthly(expense) {
    const btn = document.createElement('button');
    if (expense.type === 'cc') {
        btn.classList.add('expense__btn', 'expense__btn--info');
        btn.innerHTML = '<i class="fa-solid fa-circle-info"></i>';
    } else {
        btn.classList.add('expense__btn', 'expense__btn--info');
        btn.innerHTML = '<i class="fa-solid fa-ban"></i>';
    }

    btn.addEventListener('click', function () {

        if (expense.type === 'cc') {
            invoiceModalInfo.classList.remove('hidden');

            invoiceTbody.innerHTML = '';
            let invoice = currentAccount.card[expense.idCard].invoice[expense.idInvoice];
            console.log(invoice);

            invoice.expenses.forEach(item => {
                const list = document.createElement('tr');
                list.innerHTML = `
                <td>${dateFormat(item.dueDate)}</td>
                <td>${item.description}</td>
                <td>${moneyFormat(item.installmentValue)}</td>
                <td>${item.currentInstallment}ª</td>`;
                invoiceTbody.appendChild(list);
            })

            invoiceInfoHeading.textContent = expense.description;
            invoiceInfoTotal.textContent = moneyFormat(invoice.value);

        } else return;

    });


    return btn;
}
// ---------------------- END - BTN EDIT GLOBAL ----------------------


// ---------------------- BTN RENEW FE ----------------------
function createBtnRenew(item) {
    const btn = document.createElement('button');
    btn.classList.add('expense__btn', 'expense__btn--renew');
    btn.innerHTML = '+1 ano';

    btn.addEventListener('click', function () {
        const expenses = currentAccount.expenses.filter(expense => expense.idR === item.id && expense.type === item.type);

        const expenseObj = currentAccount.fe.find(expense => expense.id === item.id);

        if (expenseObj.renew?.length > 0) {

            if (new Date(expenseObj.renew[expenseObj.renew.length - 1].date).getUTCFullYear() === new Date().getUTCFullYear()) {
                return;
            } else {
                // ADDING EXPENSES FOR 1 YEAR
                for (let i = 1; i <= 12; i++) {

                    //lastDate will store the last date of the expense
                    let lastDate = addingMonths(new Date(expenses[expenses.length - 1].dueDate), i);

                    currentAccount.expenses.push({
                        type: 'fe',
                        description: item.description,
                        value: item.value,
                        dueDate: lastDate.toISOString(),
                        id: currentAccount.expenses[currentAccount.expenses.length - 1] ? (currentAccount.expenses[currentAccount.expenses.length - 1]).id + 1 : 0,
                        idR: item.id
                    })
                }
            }
        } else {
            expenseObj.renew = [];

            const currentDate = new Date();
            expenseObj.renew.push({ date: currentDate.toISOString() });


            // ADDING EXPENSES FOR 1 YEAR
            for (let i = 1; i <= 12; i++) {

                //lastDate will store the last date of the expense
                let lastDate = addingMonths(new Date(expenses[expenses.length - 1].dueDate), i);

                currentAccount.expenses.push({
                    type: 'fe',
                    description: item.description,
                    value: item.value,
                    dueDate: lastDate.toISOString(),
                    id: currentAccount.expenses[currentAccount.expenses.length - 1] ? (currentAccount.expenses[currentAccount.expenses.length - 1]).id + 1 : 0,
                    idR: item.id
                })
            }
        }




    });

    return btn;
}
// ---------------------- END - BTN RENEW FE ----------------------


//-------------------- REMOVE BTN (GLOBAL) ---------------------
function createBtnRemove(acc, expense) {
    const btn = document.createElement('button');
    btn.classList.add('expense__btn', 'expense__btn--remove');
    btn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

    btn.addEventListener('click', function () {
        //REMOVING THE DATA OF THE TABLE
        const tr = btn.closest('tr');
        if (tr) tr.remove();

        if (expense.type === 'in') {
            acc.entries.splice(acc.entries.findIndex(element => element.id === expense.id), 1);

            // ------------ UPDATE INTERFACE TO THE USER -----------------------
            updateBalance(acc);
            updateTotalValueOfTable(acc, currentMonth, currentYear);
        } else if (expense.type === 'fe') {
            //Removing all the expenses related to the current expense
            acc.expenses = acc.expenses.filter(item => !(item.idR === expense.id && new Date(item.dueDate) > new Date() && item.paid === 0));

            //Removing fixed expense
            acc.fe.splice(acc.fe.findIndex(element => element.id === expense.id), 1);

            updateBalance(acc);
            updateTotalValueOfTable(acc, currentMonth, currentYear);
        } else if (expense.type === 've') {
            //Removing all the expenses related to the current expensen
            acc.expenses.splice(acc.expenses.findIndex(element => element.idR === expense.id && element.type === 've'), 1);


            //Removing fixed expense
            acc.ve.splice(acc.ve.findIndex(element => element.id === expense.id), 1);

            updateBalance(acc);
            updateTotalValueOfTable(acc, currentMonth, currentYear);

        } else if (expense.type === 'cc') {
            //Removing all the expenses related to the current expense
            acc.expenses = acc.expenses.filter(element => !(element.idR === expense.id));

            acc.invoice.forEach((item, i) => {
                if (item.expenses.length === 1) {
                    acc.invoice.splice(i, 1);
                    currentAccount.expenses.splice(currentAccount.expenses.findIndex(element => element.idInvoice === item.id))
                } else item.expenses.filter(element => !(element.idR === expense.id && element.description === expense.description))
            });

            //Removing fixed expense
            acc.cc.splice(acc.cc.findIndex(element => element.id === expense.id), 1);

            updateBalance(currentAccount);
            updateTotalValueOfTable(currentAccount);
            updateInvoice();
            updateStatisticYearly();
        }

        createTableMonthly(currentAccount);
        localStorage.setItem('accounts', JSON.stringify(accounts));
    });

    return btn;
}
//-------------------- END - REMOVE BTN (GLOBAL) ---------------------

//-------------------- REMOVE EXPENSE BTN (GLOBAL) ---------------------
function createBtnRemoveExpense(acc, expense) {
    const btn = document.createElement('button');
    if (expense.type === 'cc' || expense.type === 've') {
        btn.classList.add('expense__btn', 'expense__btn--remove');
        btn.innerHTML = '<i class="fa-solid fa-ban"></i>';
    } else {
        btn.classList.add('expense__btn', 'expense__btn--remove');
        btn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    }


    btn.addEventListener('click', function () {
        if (expense.type === 'cc' || expense.type === 've') {
            return;
        } else {
            //REMOVING THE DATA OF THE TABLE
            const tr = btn.closest('tr');
            if (tr) tr.remove();

            acc.expenses.splice(acc.expenses.findIndex(element => element.id === expense.id), 1);

            updateBalance(acc);
            updateTotalValueOfTable(acc, currentMonth, currentYear);
        }


        createTablePending(currentAccount);
        localStorage.setItem('accounts', JSON.stringify(accounts));
    });

    return btn;
}
//-------------------- END - REMOVE EXPENSE BTN (GLOBAL) ---------------------

//-----------------  CALC BALANCE -----------------

function updateBalance(acc) {

    //CALCULATING THE CURRENT BALANCE TO THE USER
    const currentBalance = [acc.currentBalance];
    if (acc.entries.length > 0) {
        const sumIn = acc.entries.filter(item => item.received && new Date(item.paymentDate).getUTCMonth() <= currentDate.getUTCMonth() && new Date(item.paymentDate).getUTCFullYear() <= currentDate.getUTCFullYear()).reduce((acc, item) => {
            return acc + item.value;
        }, 0);

        currentBalance[0] += sumIn;
    }


    // CALCULATING THE IN VALUES TO THE USER
    const inArr = [0];
    if (acc.entries.length > 0) {
        const sumIn = acc.entries.filter(item => new Date(item.paymentDate).getUTCMonth() <= currentDate.getUTCMonth() && new Date(item.paymentDate).getUTCFullYear() <= currentDate.getUTCFullYear()).reduce((acc, item) => {
            return acc + item.value;
        }, 0);

        inArr[0] += sumIn;
    }


    // CALCULATING THE EXPENSES VALUES TO THE USER
    const expenseArr = [0];
    if (acc.expenses.length > 0) {
        const expenseSum = acc.expenses.filter(expense => new Date(expense.dueDate).getUTCMonth() <= currentDate.getUTCMonth() && new Date(expense.dueDate).getUTCFullYear() <= currentDate.getUTCFullYear()).reduce((acc, expense) => {
            return acc + expense.value;
        }, 0);

        expenseArr[0] += expenseSum;


        // CALCULATING THE VARIABLE EXPENSES
        const expenseVariableSum = acc.expenses.filter(expense => expense.type === 've' && new Date(expense.paymentDate).getUTCMonth() <= currentDate.getUTCMonth() && new Date(expense.paymentDate).getUTCFullYear() <= currentDate.getUTCFullYear()).reduce((acc, expense) => {
            return acc + expense.value;
        }, 0);

        expenseArr[0] += expenseVariableSum
    }


    // if (acc.card.length > 0) {
    //     acc.card.forEach(item => {
    //         const expenseCcSum = item.expenses.filter(expense => expense.type === 'cc' && new Date(expense.dueDate).getUTCMonth() <= currentDate.getUTCMonth() && new Date(expense.dueDate).getUTCFullYear() <= currentDate.getUTCFullYear()).reduce((acc, expense) => {
    //             return acc + expense.installmentValue;
    //         }, 0);

    //         expenseArr[0] += expenseCcSum;
    //     })
    // }



    // CALCULATING THE EXPENSES PAID
    const expensesPaidArr = [0];
    if (acc.expenses.length > 0) {
        const expensesPaidSum = acc.expenses.filter(expense => expense.paid && new Date(expense.dueDate).getUTCMonth() <= currentDate.getUTCMonth() && new Date(expense.dueDate).getUTCFullYear() <= currentDate.getUTCFullYear()).reduce((acc, expense) => {
            return acc + expense.value;
        }, 0);

        expensesPaidArr[0] += expensesPaidSum;

        const expensesPaidSum2 = acc.expenses.filter(expense => expense.paid && new Date(expense.paymentDate).getUTCMonth() <= currentDate.getUTCMonth() && new Date(expense.paymentDate).getUTCFullYear() <= currentDate.getUTCFullYear()).reduce((acc, expense) => {
            return acc + expense.value;
        }, 0);
        expensesPaidArr[0] += expensesPaidSum2;
    }


    // CALCULATING THE RESULT VALUE TO THE USER
    const resultSum = (inArr[0] - expenseArr[0]);


    // SHOWING THE RESULTS TO THE USER 
    currentValue.textContent = moneyFormat(currentBalance[0] - expensesPaidArr[0]);
    expectedValue.textContent = moneyFormat(inArr[0] - expenseArr[0]);
    valueIn.textContent = moneyFormat(inArr[0]);
    valueOut.textContent = moneyFormat(expenseArr[0]);
    valueResult.textContent = moneyFormat(resultSum);

    document.getElementById('balance-out-status').textContent = inArr[0] ? ((expenseArr[0] / inArr[0]) * 100).toFixed(2) + '%' : 0 + '%';
    document.getElementById('balance-result-status').textContent = inArr[0] ? ((resultSum / inArr[0]) * 100).toFixed(2) + '%' : 0 + '%';
}

//------------------  END CALC BALANCE -----------------


//-------------  CALC TOTAL VALUE OF TABLE -------------

function updateTotalValueOfTable(acc, month = new Date().getUTCMonth(), year = new Date().getUTCFullYear()) {
    //UPDATE TOTAL IN
    const totalValueIn = [0];
    // console.log(month, year);

    if (acc.entries.length > 0 && month && year) {
        const sumIn = acc.entries.filter(item => {
            return item.received && new Date(item.paymentDate).getUTCMonth() === month && new Date(item.paymentDate).getUTCFullYear() === year;
        }).reduce((acc, item) => {
            return acc + item.value;
        }, 0);

        totalValueIn[0] += sumIn;
        inTotal.textContent = moneyFormat(totalValueIn[0]);

    } else {
        inTotal.textContent = moneyFormat(totalValueIn[0]);
    }


    //UPDATE TOTAL EXPENSE FIXED
    if (acc.fe.length > 0) {
        const fixedSum = acc.fe.reduce((acc, expense) => {
            return acc + expense.value;
        }, 0);
        fixedTotal.textContent = moneyFormat(fixedSum);
    } else fixedTotal.textContent = moneyFormat(0);



    //UPDATE TOTAL VARIABLE EXPENSE
    const totalValueVe = [0];
    // console.log(month, year);

    if (acc.ve.length > 0 && month && year) {
        const sumVe = acc.ve.filter(item => {
            return new Date(item.paymentDate).getUTCMonth() === month && new Date(item.paymentDate).getUTCFullYear() === year;
        }).reduce((acc, item) => {
            return acc + item.value;
        }, 0);

        totalValueVe[0] += sumVe;
        variableTotal.textContent = moneyFormat(totalValueVe[0]);
    } else {
        variableTotal.textContent = moneyFormat(totalValueIn[0]);
    }

    //UPDATE TOTAL CARD (CREDIT CARD)
    if (acc.card.length > 0) {
        if (expenseCreditCard) {
            const expenseCcSum = currentCard.expenses.filter(expense => expense.type === 'cc' && new Date(expense.dueDate).getUTCMonth() === new Date().getUTCMonth() && new Date(expense.dueDate).getUTCFullYear() === new Date().getUTCFullYear()).reduce((acc, expense) => {
                return acc + expense.installmentValue;
            }, 0);

            ccSpanTotalMonth.textContent = moneyFormat(expenseCcSum);

            const expenseCcSum2 = currentCard.cc.filter(expense => expense.status === 0).reduce((acc, expense) => {
                return acc + expense.value;
            }, 0);

            ccSpanTotalCard.textContent = moneyFormat(expenseCcSum2);
        }
    }
}

//-------------------------  END CALC TOTAL VALUE OF TABLE ---------------------------


//---------------  SEARCH FILTER IN -----------------

function searchFilter(acc, month, year) {
    if (expenseIn) {
        if (acc.entries.length > 0) {
            inTable.innerHTML = '';
            updateTotalValueOfTable(acc, month, year);
            currentMonth = month;
            currentYear = year;

            acc.entries.filter(item => {
                return new Date(item.paymentDate).getUTCMonth() === month && new Date(item.paymentDate).getUTCFullYear() === year
            }).forEach(item => {
                const list = document.createElement('tr');
                list.dataset.in = item.id;
                list.innerHTML = `<td>${item.description}</td>
                <td>${moneyFormat(item.value)}</td>
                <td>${dateFormat(item.paymentDate)}</td>`;

                //Creating 'td' for status
                const tdStatus = document.createElement('td');
                const btnStatus = createBtnStatusIn(acc, item);
                tdStatus.appendChild(btnStatus);
                list.appendChild(tdStatus);

                //Creating 'td' for btn remove
                const tdRemove = document.createElement('td');
                const btnRemove = createBtnRemove(acc, item);
                tdRemove.appendChild(btnRemove);
                list.appendChild(tdRemove);

                //Creating 'td' for btn edit
                const tdEdit = document.createElement('td');
                const btnEdit = createBtnEdit(item);
                tdEdit.appendChild(btnEdit);
                list.appendChild(tdEdit);

                inTable.appendChild(list);
            });
        } else console.log('filtro esta vazio!');
    } else if (expenseVariable) {
        if (acc.ve.length > 0) {
            variableTable.innerHTML = '';
            updateTotalValueOfTable(acc, month, year);
            currentMonth = month;
            currentYear = year;

            acc.ve.filter(item => {
                return new Date(item.paymentDate).getUTCMonth() === month && new Date(item.paymentDate).getUTCFullYear() === year
            }).forEach(item => {
                const list = document.createElement('tr');
                list.dataset.in = item.id;
                list.innerHTML = `<td>${item.description}</td>
                <td>${moneyFormat(item.value)}</td>
                <td>${dateFormat(item.paymentDate)}</td>`;

                //Creating 'td' for btn remove
                const tdRemove = document.createElement('td');
                const btnRemove = createBtnRemove(acc, item);
                tdRemove.appendChild(btnRemove);
                list.appendChild(tdRemove);

                //Creating 'td' for btn edit
                const tdEdit = document.createElement('td');
                const btnEdit = createBtnEdit(item);
                tdEdit.appendChild(btnEdit);
                list.appendChild(tdEdit);

                variableTable.appendChild(list);
            });
        } else console.log('Filtro está vazio!');

    }
}

//---------------  END - SEARCH FILTER IN -----------------


//-------------------------  SWITCHING EXPENSES BOOLEAN  ---------------------------
// IF IN TRUE => Vai mexer somente nos valores totais da tabela de entrada
//
function switchActiveExpenseTableValue(value) {
    if (value === 'in') {
        expenseIn = true;
        expenseFixed = false;
        expenseVariable = false;
        expenseCreditCard = false;
    } else if (value === 'fixed') {
        expenseIn = false;
        expenseFixed = true;
        expenseVariable = false;
        expenseCreditCard = false;
    } else if (value === 'variable') {
        expenseIn = false;
        expenseFixed = false;
        expenseVariable = true;
        expenseCreditCard = false;
    } else {
        expenseIn = false;
        expenseFixed = false;
        expenseVariable = false;
        expenseCreditCard = true;
    }
}
//-------------------------  END - SWITCHING EXPENSES BOOLEAN  ---------------------------

//FUNCÇÃO DE ADICIONAR MESES
function addingMonths(date, months) {
    let newDate = new Date(date); // copia a data para evitar mutação

    //Incrementa o número de meses
    newDate.setMonth(date.getUTCMonth() + months);

    //Retorna o mês com o incremento
    return newDate;
}

function createExpensesCreditCard(curCard, curExpense) {
    if (curCard && curExpense) {
        const purchaseDate = new Date(new Date(currentExpense.purchaseDate).getUTCFullYear(), new Date(currentExpense.purchaseDate).getUTCMonth(), new Date(currentExpense.purchaseDate).getUTCDate());
        const dueDateCard = new Date(curCard.dueDate);
        const invoiceClosingCard = new Date(curCard.invoiceClosing).getUTCDate();

        const newDate = purchaseDate;

        // console.log(newDate);


        if (newDate.getUTCDate() < invoiceClosingCard) {
            // console.log('Pode incluir a despesa nesse mes');

            newDate.setDate(dueDateCard.getUTCDate());

            curCard.expenses.push({
                type: 'cc',
                description: currentExpense.description,
                installmentValue: currentExpense.installmentValue,
                currentInstallment: 1,
                dueDate: newDate.toISOString(),
                paid: 0,
                id: currentCard.expenses[currentCard.expenses.length - 1] ? (currentCard.expenses[currentCard.expenses.length - 1]).id + 1 : 0,
                idR: currentExpense.id,
                idCard: currentCard.id,
            })

            for (let i = 1; i < curExpense.installmentNumber; i++) {
                let date = addingMonths(newDate, i);

                curCard.expenses.push({
                    type: 'cc',
                    description: currentExpense.description,
                    installmentValue: currentExpense.installmentValue,
                    currentInstallment: 1 + i,
                    dueDate: date.toISOString(),
                    paid: 0,
                    id: currentCard.expenses[currentCard.expenses.length - 1] ? (currentCard.expenses[currentCard.expenses.length - 1]).id + 1 : 0,
                    idR: currentExpense.id,
                    idCard: currentCard.id,
                })
            }

        } else {
            // console.log('Incluir a despesa no proximo mes');
            newDate.setDate(dueDateCard.getUTCDate());

            for (let i = 1; i <= curExpense.installmentNumber; i++) {
                let date = addingMonths(newDate, i);

                curCard.expenses.push({
                    type: 'cc',
                    description: currentExpense.description,
                    installmentValue: currentExpense.installmentValue,
                    currentInstallment: i,
                    dueDate: date.toISOString(),
                    paid: 0,
                    id: currentCard.expenses[currentCard.expenses.length - 1] ? (currentCard.expenses[currentCard.expenses.length - 1]).id + 1 : 0,
                    idR: currentExpense.id,
                    idCard: currentCard.id,
                })
            }
        }
    }
}

function updateInvoice() {
    if (currentCard) {
        if (currentCard.invoice.length > 0) {

            currentInvoice = currentCard.invoice[currentCard.invoice.findIndex(expense => expense.idCard === currentCard.id && new Date(expense.invoiceClosing).getUTCMonth() === new Date().getUTCMonth() && new Date(expense.invoiceClosing).getUTCFullYear() === new Date().getUTCFullYear())]
            // console.log(currentInvoice);

            //Criar um td com o valor total de todas essas despesas, (descrição = nome do cartao, valor = valor total de todas as despesas, info = lista das despesas incluídas no cartão)
            if (currentInvoice) {

                if (currentCard.expenses.length > 0) {
                    currentExpenses = currentCard.expenses.filter(expense => new Date(expense.dueDate).getUTCMonth() === currentDate.getUTCMonth() && new Date(expense.dueDate).getUTCFullYear() === currentDate.getUTCFullYear());

                    currentInvoice.expenses = [...currentExpenses];

                    const invoiceSum = currentExpenses.reduce((acc, expense) => acc + expense.installmentValue, 0)
                    currentInvoice.value = invoiceSum;
                }

            } else {

                if (currentCard.expenses.length > 0) {

                    currentExpenses = currentCard.expenses.filter(expense => new Date(expense.dueDate).getUTCMonth() === currentDate.getUTCMonth() && new Date(expense.dueDate).getUTCFullYear() === currentDate.getUTCFullYear())
                    // console.log('Despesas da 1º fatura: ',currentExpenses);

                    if (currentExpenses) {
                        let newDate = new Date(currentCard.invoiceClosing); // copia a data de fechamento da fatura

                        //Muda o mês do fechamento da fatura para o mês atual
                        newDate.setMonth(currentDate.getUTCMonth());
                        newDate.setFullYear(currentDate.getUTCFullYear());

                        currentCard.invoice.push({
                            expenses: [...currentExpenses],
                            id: currentCard.invoice.length > 0 ? (currentCard.invoice[currentCard.invoice.length - 1]).id + 1 : 0,
                            idCard: currentCard.id,
                            invoiceClosing: newDate.toISOString(),
                            dueDate: currentExpenses[0].dueDate,
                            cardName: currentCard.name,
                            status: 0
                        })

                        currentInvoice = currentCard.invoice[currentCard.invoice.findIndex(expense => expense.idCard === currentCard.id && new Date(expense.invoiceClosing).getUTCMonth() === currentDate.getUTCMonth() && new Date(expense.invoiceClosing).getUTCFullYear() === currentDate.getUTCFullYear())];
                        // console.log('Fatura criada pela primeira vez: ',currentInvoice);

                    }

                }

            }

        } else {

            if (currentCard.expenses.length > 0) {

                currentExpenses = currentCard.expenses.filter(expense => new Date(expense.dueDate).getUTCMonth() === new Date().getUTCMonth() && new Date(expense.dueDate).getUTCFullYear() === new Date().getUTCFullYear())
                // console.log('Despesas da 1º fatura: ',currentExpenses);

                if (currentExpenses) {
                    let newDate = new Date(currentCard.invoiceClosing); // copia a data de fechamento da fatura

                    //Muda o mês do fechamento da fatura para o mês atual
                    newDate.setMonth(new Date().getUTCMonth());
                    newDate.setFullYear(new Date().getUTCFullYear());

                    currentCard.invoice.push({
                        expenses: [...currentExpenses],
                        id: currentCard.invoice.length > 0 ? (currentCard.invoice[currentCard.invoice.length - 1]).id + 1 : 0,
                        idCard: currentCard.id,
                        invoiceClosing: newDate.toISOString(),
                        dueDate: currentExpenses[0].dueDate,
                        cardName: currentCard.name,
                        paid: 0,
                        type: 'cc'
                    })

                    currentInvoice = currentCard.invoice[currentCard.invoice.findIndex(expense => expense.idCard === currentCard.id && new Date(expense.invoiceClosing).getUTCMonth() === new Date().getUTCMonth() && new Date(expense.invoiceClosing).getUTCFullYear() === new Date().getUTCFullYear())];
                    // console.log('Fatura criada pela primeira vez: ',currentInvoice);

                    const invoiceSum = currentExpenses.reduce((acc, expense) => acc + expense.installmentValue, 0)
                    currentInvoice.value = invoiceSum;
                }

            }

        }

        localStorage.setItem('accounts', JSON.stringify(accounts));
    }
}


function searchFilterExpenses(acc, text, month, year) {
    filterExpensesTable.innerHTML = '';

    if (acc.expenses.length > 0) {
        currentMonth = month;
        currentYear = year;

        let searchExpenses = acc.expenses.filter(item => {
            return new Date(item.dueDate).getUTCMonth() === month && new Date(item.dueDate).getUTCFullYear() === year && item.description.toLowerCase().includes(`${text}`);
        });
        // console.log(searchExpenses);

        let searchExpensesVariable = acc.expenses.filter(item => {
            return new Date(item.paymentDate).getUTCMonth() === month && new Date(item.paymentDate).getUTCFullYear() === year && item.description.toLowerCase().includes(`${text}`) && item.type === 've';
        });


        if (searchExpenses.length > 0 && searchExpensesVariable.length > 0) {
            filterExpensesSpan.classList.add('hidden');
            // console.log(searchExpenses); 

            searchExpenses.forEach(item => {
                const list = document.createElement('tr');
                list.dataset.in = item.id;
                list.innerHTML = `<td>${dateFormat(item.dueDate)}</td>
                <td>${item.description}</td>
                <td>${moneyFormat(item.value)}</td>`;

                const tdPaid = document.createElement('td');
                const btn = document.createElement('button');
                btn.classList.add('expense__btn', `${item.paid ? 'expense__btn--paid' : 'expense__btn--not-paid'}`);
                btn.innerText = `${item.paid ? 'pago' : 'não pago'}`;
                tdPaid.appendChild(btn);
                list.appendChild(tdPaid);

                const tdInfo = document.createElement('td');
                const btnInfo = showInfo(item);
                tdInfo.appendChild(btnInfo);
                list.appendChild(tdInfo);

                filterExpensesTable.appendChild(list);
            });

            searchExpensesVariable.forEach(item => {
                const list = document.createElement('tr');
                list.dataset.in = item.id;
                list.innerHTML = `<td>${dateFormat(item.paymentDate)}</td>
                <td>${item.description}</td>
                <td>${moneyFormat(item.value)}</td>`;

                const tdPaid = document.createElement('td');
                const btn = document.createElement('button');
                btn.classList.add('expense__btn', `${item.paid ? 'expense__btn--paid' : 'expense__btn--not-paid'}`);
                btn.innerText = `${item.paid ? 'pago' : 'não pago'}`;
                tdPaid.appendChild(btn);
                list.appendChild(tdPaid);

                const tdInfo = document.createElement('td');
                const btnInfo = showInfo(item);
                tdInfo.appendChild(btnInfo);
                list.appendChild(tdInfo);

                filterExpensesTable.appendChild(list);
            });

            return;
        } else if (searchExpenses.length > 0) {
            filterExpensesSpan.classList.add('hidden');
            searchExpenses.forEach(item => {
                const list = document.createElement('tr');
                list.dataset.in = item.id;
                list.innerHTML = `<td>${dateFormat(item.dueDate)}</td>
                <td>${item.description}</td>
                <td>${moneyFormat(item.value)}</td>`;

                const tdPaid = document.createElement('td');
                const btn = document.createElement('button');
                btn.classList.add('expense__btn', `${item.paid ? 'expense__btn--paid' : 'expense__btn--not-paid'}`);
                btn.innerText = `${item.paid ? 'pago' : 'não pago'}`;
                tdPaid.appendChild(btn);
                list.appendChild(tdPaid);

                const tdInfo = document.createElement('td');
                const btnInfo = showInfo(item);
                tdInfo.appendChild(btnInfo);
                list.appendChild(tdInfo);

                filterExpensesTable.appendChild(list);
            });

            return;
        } else if (searchExpensesVariable.length > 0) {
            filterExpensesSpan.classList.add('hidden');
            searchExpensesVariable.forEach(item => {
                const list = document.createElement('tr');
                list.dataset.in = item.id;
                list.innerHTML = `<td>${dateFormat(item.paymentDate)}</td>
                <td>${item.description}</td>
                <td>${moneyFormat(item.value)}</td>`;

                const tdPaid = document.createElement('td');
                const btn = document.createElement('button');
                btn.classList.add('expense__btn', `${item.paid ? 'expense__btn--paid' : 'expense__btn--not-paid'}`);
                btn.innerText = `${item.paid ? 'pago' : 'não pago'}`;
                tdPaid.appendChild(btn);
                list.appendChild(tdPaid);

                const tdInfo = document.createElement('td');
                const btnInfo = showInfo(item);
                tdInfo.appendChild(btnInfo);
                list.appendChild(tdInfo);

                filterExpensesTable.appendChild(list);
            });

            return;
        } else filterExpensesSpan.classList.remove('hidden');

    }
}


function showInfo(expense) {
    const btn = document.createElement('button');

    if (expense.type === 'cc') {
        btn.classList.add('expense__btn', 'expense__btn--info');
        btn.innerHTML = '<i class="fa-solid fa-circle-info"></i>';
    } else {
        btn.classList.add('expense__btn', 'expense__btn--info');
        btn.innerHTML = '<i class="fa-solid fa-ban"></i>';
    }


    btn.addEventListener('click', function () {
        if (expense.type === 'cc') {
            invoiceModalInfo.classList.remove('hidden');

            invoiceTbody.innerHTML = '';
            let invoice = currentAccount.card[expense.idCard].invoice[expense.idInvoice];
            // console.log(invoice);

            invoice.expenses.forEach(item => {
                const list = document.createElement('tr');
                list.innerHTML = `
                <td>${dateFormat(item.dueDate)}</td>
                <td>${item.description}</td>
                <td>${moneyFormat(item.installmentValue)}</td>
                <td>${item.currentInstallment}ª</td>`;
                invoiceTbody.appendChild(list);
            })

            invoiceInfoHeading.textContent = expense.description;
            invoiceInfoTotal.textContent = moneyFormat(invoice.value);

        }
    });

    return btn;
}


//  FUNÇÃO PARA O EFEITO DE ZOOM E BLUR NAS CELULAS DA TABELA
document.querySelectorAll('.statistic__td').forEach(cell => {
    cell.addEventListener('mouseenter', function () {
        document.querySelectorAll('.statistic__td').forEach(c => c.classList.add('blur'));
        this.classList.remove('blur');
        this.classList.add('active');
    });

    cell.addEventListener('mouseleave', function () {
        document.querySelectorAll('.statistic__td').forEach(c => {
            c.classList.remove('blur', 'active');
        });
    });

});


// UPDATE STATISTIC YEARLY
function updateStatisticYearly(year = currentDate.getUTCFullYear()) {
    inputStatisticYear.value = year;

    // const statisticYearlyArr = [0, 0, 0];
    const statisticMonthlyArrIn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const statisticMonthlyArrOut = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const statisticMonthlyArrResult = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i <= 11; i++) {
        //IN (monthly)
        let inStatistic = currentAccount.entries.filter(item => new Date(item.paymentDate).getUTCMonth() === i && new Date(item.paymentDate).getUTCFullYear() === year).reduce((acc, expense) => acc + expense.value, 0);

        statisticMonthlyArrIn[i] += inStatistic;


        //GLOBAL OUT EXPENSES (monthly)
        let outStatistic = currentAccount.expenses.filter(expense => new Date(expense.dueDate).getUTCMonth() === i && new Date(expense.dueDate).getUTCFullYear() === year && expense.type !== 'cc').reduce((acc, expense) => acc + expense.value, 0);

        statisticMonthlyArrOut[i] += outStatistic;

        //OUT EXPENSES FROM CREDIT CARDS
        let outVariableStatistic = currentAccount.expenses.filter(expense => new Date(expense.paymentDate).getUTCMonth() === i && new Date(expense.paymentDate).getUTCFullYear() === year).reduce((acc, expense) => acc + expense.value, 0);

        if (outVariableStatistic) statisticMonthlyArrOut[i] += outVariableStatistic;

        //OUT EXPENSES FROM CREDIT CARDS
        currentAccount.card.forEach(item => {
            let outCcStatistic = item.expenses.filter(expense => new Date(expense.dueDate).getUTCMonth() === i && new Date(expense.dueDate).getUTCFullYear() === year).reduce((acc, expense) => acc + expense.installmentValue, 0);

            if (outCcStatistic) statisticMonthlyArrOut[i] += outCcStatistic;
        })
    }

    //ADDING THE MONTHLY VALUES TO THE TABLE

    //IN
    statisticMonthlyArrIn.forEach((item, i) => inMonths[i].textContent = moneyFormat(item));

    //OUT
    statisticMonthlyArrOut.forEach((item, i) => outMonths[i].textContent = moneyFormat(item));

    //RESULT
    statisticMonthlyArrResult.forEach((item, i) => {
        statisticMonthlyArrResult[i] = statisticMonthlyArrIn[i] - statisticMonthlyArrOut[i];
        resultMonths[i].textContent = moneyFormat(statisticMonthlyArrResult[i]);
    })


    //TOTAL YEARLY
    const totalYearly = [0, 0, 0];

    totalYearly[0] = statisticMonthlyArrIn.reduce((acc, item) => acc + item, 0);
    totalYearly[1] = statisticMonthlyArrOut.reduce((acc, item) => acc + item, 0);
    totalYearly[2] = totalYearly[0] - totalYearly[1];
    //IN
    inYearly.textContent = moneyFormat(totalYearly[0]);

    //OUT
    outYearly.textContent = moneyFormat(totalYearly[1]);

    //RESULT
    resultYearly.textContent = moneyFormat(totalYearly[2]);


    document.getElementById('statistic-out-status').textContent = totalYearly[0] ? ((totalYearly[1] / totalYearly[0]) * 100).toFixed(2) + '%' : 0 + '%';
    document.getElementById('statistic-result-status').textContent = totalYearly[0] ? ((totalYearly[2] / totalYearly[0]) * 100).toFixed(2) + '%' : 0 + '%';
}
// updateStatisticYearly();

// ------------------------- BACKUP -----------------------------
document.getElementById('downloadButton').addEventListener('click', function () {
    // Recupera o objeto 'accounts' do localStorage
    let accounts = localStorage.getItem('accounts');

    // Verifica se há algo no localStorage
    if (accounts) {
        // Converte o objeto em JSON
        let json = accounts; // Já está em formato JSON, pois veio do localStorage

        // Cria um blob com o JSON
        let blob = new Blob([json], { type: 'application/json' });

        // Cria um link para o arquivo
        let url = URL.createObjectURL(blob);

        // Cria um elemento <a> para o link de download
        let a = document.createElement('a');
        a.href = url;
        a.download = `backup-financas.json`;

        // Adiciona o link ao documento
        document.body.appendChild(a);

        // Clica no link para iniciar o download
        a.click();

        // Remove o elemento <a> após o download
        document.body.removeChild(a);
    } else {
        alert('Nenhum objeto "accounts" encontrado no localStorage');
    }
});

document.getElementById('loadButton').addEventListener('click', function () {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        // Leitura do arquivo JSON
        reader.onload = function (e) {
            try {
                // Parsea o conteúdo do arquivo como JSON
                const data = JSON.parse(e.target.result);

                // Sobrescreve o objeto 'accounts' no localStorage
                localStorage.setItem('accounts', JSON.stringify(data));

                // Atualiza a página
                window.location.reload();
            } catch (error) {
                alert('Falha ao carregar o arquivo de backup. Verifique se é um arquivo JSON válido.');
            }
        };

        // Leitura do arquivo como texto
        reader.readAsText(file);
    }
});
// ------------------------- END - BACKUP -----------------------------


// EVENT LISTENERS

//CREATE A NEW ACCOUNT
btnCreateAccount.addEventListener('click', function (e) {
    e.preventDefault();

    if (inputBankName.value === '') {
        showAccountModal('Preencha o campo do nome do banco !');
        return
    } else if (inputAccountHolder.value === '') {
        showAccountModal('Preencha o campo do nome do titular !');
        return;
    } else if (inputCurrentBalance.value === '' || inputCurrentBalance.value < 0) {
        showAccountModal('Preencha o campo corretamente! O valor não pode ser negativo e o menor valor é 0 (zero)');
        return;
    }

    if (inputBankName.value !== '' && inputAccountHolder.value !== '' && inputCurrentBalance.value >= 0) {
        console.log(inputBankName.value);
        console.log(inputAccountHolder.value);
        console.log(inputCurrentBalance.value);

        const date = new Date();

        const newAccount = {
            accountHolder: `${inputAccountHolder.value}`,
            bank: `${inputBankName.value}`,
            currentBalance: +inputCurrentBalance.value,
            creationDate: date.toISOString(),
            entries: [],
            fe: [],
            ve: [],
            card: [],
            expenses: [],
        }

        newAccount.id = accounts[accounts.length - 1] ? (accounts[accounts.length - 1]).id + 1 : 0;
        accounts.push(newAccount);
        currentAccount = newAccount;

        // ------------ UPDATE INTERFACE TO THE USER -----------------------
        updateBalance(currentAccount);
        updateTotalValueOfTable(currentAccount, currentMonth, currentYear);
        createTableIn(currentAccount);
        createTableMonthly(currentAccount);
        updateStatisticYearly();

        bankNameSpan.textContent = currentAccount.bank;
        accountHolderSpan.textContent = currentAccount.accountHolder;

        inputBankName.value = inputAccountHolder.value = inputCurrentBalance.value = '';

        accountsContent.innerHTML = '';

        accounts.forEach(account => {
            createAccountsCard(account);
        })

        localStorage.setItem('accounts', JSON.stringify(accounts));
    }

})

accountModalBtnClose.addEventListener('click', function () {
    accountModal.classList.add('hidden');
    accountOverlay.classList.add('hidden');
})

accountOverlay.addEventListener('click', function () {
    accountModal.classList.add('hidden');
    accountOverlay.classList.add('hidden');
})

accountModalEditBtnClose.addEventListener('click', function () {
    accountModalEdit.classList.add('hidden');
    overlay.classList.add('hidden');
})

btnEditAcc.addEventListener('click', function (e) {
    e.preventDefault();

    const accountEdit = accounts.find(acc => acc.id === +inputEditID.value);
    accountEdit.bank = inputEditBankName.value;
    accountEdit.accountHolder = inputEditAccHolder.value;

    if (currentAccount.id === +inputEditID.value) {
        bankNameSpan.textContent = currentAccount.bank;
        accountHolderSpan.textContent = currentAccount.accountHolder;
    }

    accountModalEdit.classList.add('hidden');
    overlay.classList.add('hidden');

    localStorage.setItem('accounts', JSON.stringify(accounts));
})

//--------------- IN FORM => Formulario de entrada -------------

inBtn.addEventListener('click', function (e) {
    e.preventDefault();

    if (currentAccount) {
        console.log('tudo ok');
        if (inDescription.value !== '' && inValue.value !== '' && inDate.value !== '') {

            const date = new Date(inDate.value);

            const currentItem = {
                description: inDescription.value,
                value: +inValue.value,
                type: 'in',
                received: 0,
                paymentDate: date.toISOString()
            }

            //ADDING AN ID
            currentItem.id = currentAccount.entries[currentAccount.entries.length - 1] ? (currentAccount.entries[currentAccount.entries.length - 1]).id + 1 : 0;


            currentAccount.entries.push(currentItem);

            inDescription.value = '';
            inValue.value = '';
            inDate.value = formatDateInput();

            // ------------ UPDATE INTERFACE TO THE USER -----------------------
            updateBalance(currentAccount);
            updateTotalValueOfTable(currentAccount, currentMonth, currentYear);
            createTableIn(currentAccount);
            updateStatisticYearly();

            localStorage.setItem('accounts', JSON.stringify(accounts));
        }

    } else {
        inDescription.value = '';
        inValue.value = '';
        inDate.value = formatDateInput();
    }
})

//----------------------- END FORM IN ------------------------


//----------------------- FILTER IN ------------------------

filterInMonth.value = new Date().getMonth();
filterInYear.value = new Date().getFullYear();

filterInBtn.addEventListener('click', function () {
    searchFilter(currentAccount, +filterInMonth.value, +filterInYear.value);
})

filterInMonth.addEventListener('input', function () {
    searchFilter(currentAccount, +filterInMonth.value, +filterInYear.value);
})

filterInYear.addEventListener('input', function () {
    searchFilter(currentAccount, +filterInMonth.value, +filterInYear.value);
})

//----------------------- END FILTER IN ------------------------


//-----------------------  FORM EDIT IN ------------------------

btnFormEditIn.addEventListener('click', function (e) {
    e.preventDefault();

    // console.log('id: ', inputEditInId.value);
    // console.log('Description: ', inputEditInDescription.value);
    // console.log('value: ', inputEditInValue.value);
    // console.log('Date: ', inputEditInDate.value);

    // console.log(currentAccount.entries[currentAccount.entries.findIndex(item => item.id === +inputEditInId.value)]);


    const dateObject = new Date(new Date(inputEditInDate.value).getUTCFullYear(), new Date(inputEditInDate.value).getUTCMonth(), new Date(inputEditInDate.value).getUTCDate());

    // console.log(dateFormat(dateObject) === dateFormat(new Date(dataIn.paymentDate))); //true

    if (dateFormat(dateObject) !== dateFormat(new Date(currentExpense.paymentDate))) {
        currentExpense.paymentDate = dateObject.toISOString();
        createTableIn(currentAccount);
        updateTotalValueOfTable(currentAccount);
    } else if (+inputEditInValue.value !== currentExpense.value) {
        currentExpense.value = +inputEditInValue.value;
        createTableIn(currentAccount);
        updateTotalValueOfTable(currentAccount);
    } else if (inputEditInDescription.value !== currentExpense.description) {
        currentExpense.description = inputEditInDescription.value;
        createTableIn(currentAccount);
        updateTotalValueOfTable(currentAccount);
    }


    modalEditIn.classList.add('hidden');
    overlay.classList.add('hidden');
    localStorage.setItem('accounts', JSON.stringify(accounts));
});


btnModalEditInClose.addEventListener('click', function () {
    modalEditIn.classList.add('hidden');
    overlay.classList.add('hidden');
})

//-----------------------  END - FORM EDIT IN ------------------------





//--------------- EXPENSE FIXED FORM -------------

fixedBtn.addEventListener('click', function (e) {
    e.preventDefault();

    if (currentAccount) {
        // console.log('tudo ok');
        if (fixedDescription.value !== '' && fixedValue.value !== '' && fixedDate.value !== '') {

            const date = new Date(fixedDate.value);

            const currentItem = {
                description: fixedDescription.value,
                value: +fixedValue.value,
                type: 'fe',
                dueDate: date.toISOString(),
            }

            //ADDING AN ID
            currentItem.id = currentAccount.fe[currentAccount.fe.length - 1] ? (currentAccount.fe[currentAccount.fe.length - 1]).id + 1 : 0;


            currentAccount.fe.push(currentItem);

            fixedDescription.value = '';
            fixedValue.value = '';
            fixedDate.value = '';

            // ONE YEAR REGISTER
            const currentDate = dateFormat(new Date());
            const dueDate = dateFormat(new Date(currentItem.dueDate));

            if (dueDate >= currentDate) {
                // ADDING THE EXPENSE TO THE NEXT MONTH
                currentAccount.expenses.push({
                    type: 'fe',
                    description: currentItem.description,
                    value: currentItem.value,
                    dueDate: currentItem.dueDate,
                    paid: 0,
                    id: currentAccount.expenses[currentAccount.expenses.length - 1] ? (currentAccount.expenses[currentAccount.expenses.length - 1]).id + 1 : 0,
                    idR: currentItem.id,
                })

                for (let i = 1; i <= 12; i++) {
                    let date = addingMonths(new Date(currentItem.dueDate), i);

                    currentAccount.expenses.push({
                        type: 'fe',
                        description: currentItem.description,
                        value: currentItem.value,
                        dueDate: date.toISOString(),
                        paid: 0,
                        id: currentAccount.expenses[currentAccount.expenses.length - 1] ? (currentAccount.expenses[currentAccount.expenses.length - 1]).id + 1 : 0,
                        idR: currentItem.id
                    })
                }

            } else {
                for (let i = 1; i <= 12; i++) {
                    let date = addingMonths(new Date(currentItem.dueDate), i);

                    currentAccount.expenses.push({
                        type: 'fe',
                        description: currentItem.description,
                        value: currentItem.value,
                        dueDate: date.toISOString(),
                        paid: 0,
                        id: currentAccount.expenses[currentAccount.expenses.length - 1] ? (currentAccount.expenses[currentAccount.expenses.length - 1]).id + 1 : 0,
                        idR: currentItem.id
                    })
                }
            }

            // ------------ UPDATE INTERFACE TO THE USER -----------------------
            updateBalance(currentAccount);
            updateTotalValueOfTable(currentAccount, currentMonth, currentYear);
            createTableFixed(currentAccount);
            createTableMonthly(currentAccount);
            updateStatisticYearly();

            localStorage.setItem('accounts', JSON.stringify(accounts));
        }

    } else {
        fixedDescription.value = '';
        fixedValue.value = '';
        fixedDate.value = '';
    }
})

btnFormEditFe.addEventListener('click', function (e) {
    e.preventDefault();
    const radioValue = document.querySelector(`input[name="option"]:checked`).value;

    // Obtém a data do vencimento
    const dateObj = new Date(currentExpense.dueDate);

    //Cria uma nova data para o último dia do mês
    //Quando você define o dia como 0, o JavaScript considera isso como o último dia do mês anterior.
    const lastDay = new Date(dateObj.getUTCFullYear(), dateObj.getUTCMonth() + 1, 0);

    if (+inputEditFeDate.value !== new Date(currentExpense.dueDate).getUTCDate() && +inputEditFeDate.value <= lastDay.getDate() && +inputEditFeDate.value >= 1) {
        const newDate = new Date(currentExpense.dueDate);
        newDate.setUTCDate(+inputEditFeDate.value);
        currentExpense.dueDate = newDate.toISOString();


        // CHANGING THE DUE DATE OF ALL THE EXPENSES RELATED TO THE ORIGINAL FATHER
        currentAccount.expenses.filter(item => item.idR === currentExpense.id).forEach(expense => {
            const newDate = new Date(expense.dueDate);
            newDate.setUTCDate(+inputEditFeDate.value);
            expense.dueDate = newDate.toISOString();
        })

        //UPDATE THE USER INTERFACE
        createTableFixed(currentAccount);
        //atualizar a tabela de despesa mensal e pendente
    }

    if (inputEditFeDescription.value !== currentExpense.description) {
        currentExpense.description = inputEditFeDescription.value;

        currentAccount.expenses.filter(item => item.idR === currentExpense.id).forEach(expense => expense.description = inputEditFeDescription.value);

        //UPDATE THE USER INTERFACE
        createTableFixed(currentAccount);
    }

    if (+radioValue === 0) {
        if (+inputEditFeValue.value !== currentExpense.value) {
            const expenseObj = currentAccount.expenses.filter(item => item.idR === currentExpense.id && new Date(item.dueDate).getUTCMonth() === new Date().getUTCMonth() && new Date(item.dueDate).getUTCFullYear() === new Date().getUTCFullYear());

            expenseObj[0].value = +inputEditFeValue.value;

            // currentExpense.value = +inputEditInValue.value;
            // createTableIn(currentAccount);
            // updateTotalValueOfTable(currentAccount);
            // updateBalance(currentAccount);
        }

    } else if (+radioValue === 1) {
        if (+inputEditFeValue.value !== currentExpense.value) {
            //MUDANDO O VALOR DA DESPESA FIXA
            currentAccount.fe.find(expense => expense.id === currentExpense.id).value = +inputEditFeValue.value;

            //MUDANDO OS DADOS DAS DESPESAS DO ANO ATUAL
            currentAccount.expenses.filter(item => item.idR === currentExpense.id && new Date(item.dueDate).getUTCMonth() > new Date().getUTCMonth() && new Date(item.dueDate).getUTCFullYear() === new Date().getUTCFullYear()).forEach(item => {
                item.value = +inputEditFeValue.value;
            });

            //MUDANDO OS DADOS DAS DESPESAS DO PRÓXIMO ANO
            currentAccount.expenses.filter(item => item.idR === currentExpense.id && new Date(item.dueDate).getUTCFullYear() !== new Date().getUTCFullYear()).forEach(item => {
                item.value = +inputEditFeValue.value;
            });

            // createTableFixed(currentAccount);
            // updateTotalValueOfTable(currentAccount);
            // updateBalance(currentAccount);
        }

    } else if (+radioValue === 2) {
        if (+inputEditFeValue.value !== currentExpense.value) {

            //MUDANDO OS DADOS DAS DESPESAS DO ANO ATUAL (incluindo o mês atual)
            currentAccount.expenses.filter(item => item.idR === currentExpense.id && new Date(item.dueDate).getUTCMonth() === new Date().getUTCMonth() && new Date(item.dueDate).getUTCFullYear() === new Date().getUTCFullYear()).forEach(item => {
                item.value = +inputEditFeValue.value;
            });

            //MUDANDO OS DADOS DAS DESPESAS DOS ANOS SUBSEQUENTES
            currentAccount.expenses.filter(item => item.idR === currentExpense.id && new Date(item.dueDate).getUTCFullYear() !== new Date().getUTCFullYear()).forEach(item => {
                item.value = +inputEditFeValue.value;
            });

            // createTableFixed(currentAccount);
            // updateTotalValueOfTable(currentAccount);
            // updateBalance(currentAccount);
        }
    };

    createTableFixed(currentAccount);
    updateTotalValueOfTable(currentAccount);
    updateBalance(currentAccount);
    createTableMonthly(currentAccount);
    updateStatisticYearly();
    localStorage.setItem('accounts', JSON.stringify(accounts));

    modalEditFe.classList.add('hidden');
    overlay.classList.add('hidden');
});

btnModalEditFeClose.addEventListener('click', function () {
    modalEditFe.classList.add('hidden');
    overlay.classList.add('hidden');
})

//----------------------- END FORM EXPENSE FIXED ------------------------



//-----------------------  FORM EDIT VARIABLE ------------------------

variableBtn.addEventListener('click', function (e) {
    e.preventDefault();

    if (currentAccount) {
        console.log('tudo ok');
        if (variableDescription.value !== '' && variableValue.value !== '') {

            const date = new Date();

            const currentItem = {
                description: variableDescription.value,
                value: +variableValue.value,
                type: 've',
                paid: 1,
                paymentDate: date.toISOString()
            }

            //ADDING AN ID
            currentItem.id = currentAccount.ve[currentAccount.ve.length - 1] ? (currentAccount.ve[currentAccount.ve.length - 1]).id + 1 : 0;

            currentAccount.ve.push(currentItem);

            const currentItemExpense = {
                description: variableDescription.value,
                value: +variableValue.value,
                type: 've',
                paid: 1,
                paymentDate: date.toISOString()
            }

            currentItemExpense.idR = currentItem.id;
            currentItemExpense.id = currentAccount.expenses[currentAccount.expenses.length - 1] ? (currentAccount.expenses[currentAccount.expenses.length - 1]).id + 1 : 0;
            currentAccount.expenses.push(currentItemExpense);

            variableDescription.value = '';
            variableValue.value = '';

            // ------------ UPDATE INTERFACE TO THE USER -----------------------
            updateBalance(currentAccount);
            updateTotalValueOfTable(currentAccount, currentMonth, currentYear);
            createTableVariable(currentAccount);
            createTableMonthly(currentAccount);
            updateStatisticYearly();

            localStorage.setItem('accounts', JSON.stringify(accounts));
        }

    } else {
        variableDescription.value = '';
        variableValue.value = '';
    }
})


filterVeBtn.addEventListener('click', function () {
    searchFilter(currentAccount, +filterVeMonth.value, +filterVeYear.value);
})

filterVeMonth.addEventListener('input', function () {
    searchFilter(currentAccount, +filterVeMonth.value, +filterVeYear.value);
})

filterVeYear.addEventListener('input', function () {
    searchFilter(currentAccount, +filterVeMonth.value, +filterVeYear.value);
})


btnFormEditVe.addEventListener('click', function (e) {
    e.preventDefault();

    if (+inputEditVeValue.value !== currentExpense.value) {
        currentExpense.value = +inputEditVeValue.value;
        currentAccount.expenses.find(element => element.idR === currentExpense.id && element.type === 've').value = +inputEditVeValue.value;

        createTableVariable(currentAccount);
        createTableMonthly(currentAccount);
        updateTotalValueOfTable(currentAccount);
        updateBalance(currentAccount);
        updateStatisticYearly();
    } else if (inputEditVeDescription.value !== currentExpense.description) {
        currentExpense.description = inputEditVeDescription.value;
        currentAccount.expenses.find(element => element.idR === currentExpense.id && element.type === 've').description = inputEditVeDescription.value;

        createTableVariable(currentAccount);
        updateTotalValueOfTable(currentAccount);
        createTableMonthly(currentAccount);
        updateBalance(currentAccount);
        updateStatisticYearly();
    }

    modalEditVe.classList.add('hidden');
    overlay.classList.add('hidden');
    localStorage.setItem('accounts', JSON.stringify(accounts));
});

btnModalEditVeClose.addEventListener('click', function () {
    modalEditVe.classList.add('hidden');
    overlay.classList.add('hidden');
})


//-----------------------  END - FORM EDIT VARIABLE ------------------------


//-----------------------  CREATE CREDIT CARD  ------------------------

btnCreateCc.addEventListener('click', function (e) {
    e.preventDefault();

    if (inputCcName.value === '') {
        return;
    } else if (inputCcDueDate.value === '') {
        return;
    } else if (inputCcInvoiceClosing.value === '') {
        return;
    }

    if (inputCcName.value !== '' && inputCcDueDate.value !== '' && inputCcInvoiceClosing.value !== '') {
        // console.log(inputCcName.value);
        // console.log(inputCcDueDate.value);
        // console.log(inputCcInvoiceClosing.value);
        const dueDate = new Date(inputCcDueDate.value);
        const dateInvoiceClosing = new Date(inputCcInvoiceClosing.value);


        if (currentAccount.card?.length > 0) {


            const currentItem = {
                id: currentAccount.card[currentAccount.card.length - 1] ? (currentAccount.card[currentAccount.card.length - 1]).id + 1 : 0,
                accountHolder: currentAccount.accountHolder,
                name: inputCcName.value,
                cc: [],
                expenses: [],
                invoice: [],
                dueDate: dueDate,
                invoiceClosing: dateInvoiceClosing
            };

            currentAccount.card.push(currentItem);
            currentCard = currentItem;

            cardsContent.innerHTML = '';

            if (currentAccount.card.length > 0) {
                if (cardsContent && getComputedStyle(cardsContent).display !== 'none') {
                    currentAccount.card.forEach(card => createAccountsCreditCard(card));
                }
            }


        } else {
            currentAccount.card = [];

            const currentItem = {
                id: currentAccount.card[currentAccount.card.length - 1] ? (currentAccount.card[currentAccount.card.length - 1]).id + 1 : 0,
                accountHolder: currentAccount.accountHolder,
                name: inputCcName.value,
                cc: [],
                expenses: [],
                invoice: [],
                dueDate: dueDate.toISOString(),
                invoiceClosing: dateInvoiceClosing.toISOString()
            }
            currentAccount.card.push(currentItem);
            currentCard = currentItem;


            if (currentAccount.card.length > 0) {
                currentAccount.card.forEach(card => createAccountsCreditCard(card));
            }

        }

        inputCcName.value = inputCcInvoiceClosing.value = inputCcInvoiceClosing.value = '';
        createTableCc(currentCard);
        updateTotalValueOfTable(currentAccount);

        localStorage.setItem('accounts', JSON.stringify(accounts));
    }
})

//-----------------------  END - CREATE CREDIT CARD  ------------------------

//-----------------------  CREATE CREDIT CARD EXPENSE  ------------------------

btnCreateExpenseCc.addEventListener('click', function (e) {
    e.preventDefault();
    if (currentCard) {
        const ccDescription = inputCcDescription.value;
        const ccInstallmentValue = +inputCcInstallmentValue.value;
        const ccInstallmentNumber = +inputCcInstalmentNumber.value;
        const ccPurchaseDate = inputCcDate.value;

        if (new Date(ccPurchaseDate).getUTCMonth() === currentDate.getUTCMonth() && new Date(ccPurchaseDate).getUTCFullYear() === currentDate.getUTCFullYear()) {
            if (ccDescription !== '' && ccInstallmentValue > 0 && ccInstallmentNumber >= 2 && ccPurchaseDate !== '') {

                //ADDING THE FATHER EXPENSE
                const purchaseDate = new Date(ccPurchaseDate);

                const currentItem = {
                    description: ccDescription,
                    installmentValue: ccInstallmentValue,
                    installmentNumber: ccInstallmentNumber,
                    installmentPaid: 0,
                    value: ccInstallmentNumber * ccInstallmentValue,
                    status: 0,
                    type: 'cc',
                    purchaseDate: purchaseDate.toISOString(),
                }

                currentItem.id = currentCard.cc[currentCard.cc.length - 1] ? (currentCard.cc[currentCard.cc.length - 1]).id + 1 : 0;

                currentCard.cc.push(currentItem);


                //ADDING THE CHILDREN EXPENSE
                currentExpense = currentItem;
                createExpensesCreditCard(currentCard, currentExpense);

                currentInvoice = undefined;
                currentExpenses = undefined;
                updateInvoice();

                inputCcDescription.value = inputCcInstallmentValue.value = inputCcInstalmentNumber.value = '';
                inputCcDate.value = formatDateInput();

                createTableCc(currentCard);
                updateBalance(currentAccount);
                updateTotalValueOfTable(currentAccount);
                updateStatisticYearly();
                createTableMonthly(currentAccount);
                localStorage.setItem('accounts', JSON.stringify(accounts));
            }

        } else {
            document.getElementById('modal-error-cc').classList.remove('hidden');
        }
    }
})

//-----------------------  END - CREATE CREDIT CARD EXPENSE ------------------------


invoiceModalInfoClose.addEventListener('click', function () {
    invoiceModalInfo.classList.add('hidden');
})

ccModalInfoClose.addEventListener('click', function () {
    ccModalInfo.classList.add('hidden');
})

document.getElementById('error-cc-close').addEventListener('click', function () {
    document.getElementById('modal-error-cc').classList.add('hidden');
})

spanDeleteAcc.addEventListener('click', function () {
    accounts.splice([accounts.findIndex(element => element.id === +inputEditID.value)], 1);
    localStorage.setItem('accounts', JSON.stringify(accounts));

    // Update the page
    window.location.reload();
})


filterExpensesBtn.addEventListener('click', function () {
    if (filterExpensesName.value !== '') {
        searchFilterExpenses(currentAccount, filterExpensesName.value.toLowerCase(), +filterExpensesMonth.value, +filterExpensesYear.value);
    }
})


inputStatisticYear.addEventListener('input', function () {
    updateStatisticYearly(+inputStatisticYear.value);
})
