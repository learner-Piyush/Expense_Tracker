document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form")
  const expenseNameInput = document.getElementById("expense-name")
  const expenseAmountInput = document.getElementById("expense-amount")
  const expenseList = document.getElementById("expense-list")
  const totalAmountDisplay = document.getElementById("total-amount")

  let expenses = JSON.parse(localStorage.getItem("expenses")) || []
  let totalAmount = calculateTotal()

  renderExpenses()

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const name = expenseNameInput.value.trim()
    const amount = parseFloat(expenseAmountInput.value.trim())

    if (name !== "" && !isNaN(amount) && amount > 0) {
      const newExpense = {
        id: Date.now(),
        name,
        amount,
      }

      expenses.push(newExpense)
      saveExpenses()
      renderExpenses()
      updateTotal()
      expenseNameInput.value = ""
      expenseAmountInput.value = ""
    }
  })

  function calculateTotal() {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0)
  }

  function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses))
  }

  function renderExpenses() {
    expenseList.innerHTML = ""
    
    expenses.forEach(expense => {
      const li = document.createElement("li")
      li.innerHTML = `<span>${expense.name} - ₹${expense.amount}</span>
      <button data-id=${expense.id}>
      <img src="../Image Folder/icons8-delete-48.png" alt="">
      Delete
      </button>`
      expenseList.appendChild(li)
    });
  }

  function updateTotal() {
    totalAmount = calculateTotal()
    totalAmountDisplay.textContent = `₹${totalAmount.toFixed(2)}`
  }

  expenseList.addEventListener("click", (e) => {
    const button = e.target.closest("button")
    if (button) {
      const expenseID = parseInt(button.getAttribute("data-id"))
      expenses = expenses.filter((expense) => expense.id !== expenseID)

      saveExpenses()
      renderExpenses()
      updateTotal()
    }
  })
})