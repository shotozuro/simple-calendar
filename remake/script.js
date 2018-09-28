let dates = []
const dayNames = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei',
'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

const calendarEl = document.getElementById("calendar")
const monthEl = document.getElementsByName("months")
const monthSelector = document.getElementById("months")
const yearEl = document.getElementById("year")
const submitEl = document.getElementById("submit")

submitEl.addEventListener("click", onShowCalendar)

function getManyDays (month, year) {
  // get last date in certain month
  return new Date(year, parseInt(month) + 1, 0).getDate()
}

function getDaysInMonth (month, year) {
  const daysCount = getManyDays(month, year)
  const daysInMonth = Array(daysCount).fill(0).map((val, index) => {
  const newDate = new Date(year, month, Number(index) + 1)
    return {
      day: newDate.getDay(),
      month,
      year,
      date: newDate.getDate()
    }
  })
  return daysInMonth
}

function getDaysBefore (month, year) {
  const monthBefore = month == 0 ? 11 : Number(month) - 1
  const yearBefore = month == 0 ? Number(year) - 1 : year
  const lastDateMonthBefore = getManyDays(monthBefore, yearBefore)
  const firstDay = new Date(year, month, 1).getDay()
  const daysBeforeCount = firstDay == 0 ? 6 : firstDay - 1
  console.log({yearBefore})
  // get first day
  // if (firstDay == 0) get 6 days before
  // else get firstDay - 1 days before
  // daysBeforeCount - days
  const days = Array(daysBeforeCount).fill(0).map((val, index) => {
    const selectedDate = index + lastDateMonthBefore - daysBeforeCount + 1
    const newDate = new Date(yearBefore, monthBefore, selectedDate)
    return {
      day: newDate.getDay(),
      month: monthBefore,
      year: yearBefore,
      date: newDate.getDate()
    }
  })
  return days
}

function getDaysAfter (month, year) {
  const nextMonth = month == 11 ? 0 : month + 1
  const nextYear = month == 11 ? year + 1 : year
  const lastDateCurrentMonth = getManyDays(month, year)
  const lastDayCurrentMonth = new Date(year, month, lastDateCurrentMonth).getDay()
  const nextDaysCount = lastDayCurrentMonth == 0 ? 0 : 7 - lastDayCurrentMonth

  const days = Array(nextDaysCount).fill(0).map((val, index) => {
    const newDate = new Date(nextYear, nextMonth, index + 1)
    return {
      day: newDate.getDay(),
      month: nextMonth,
      year: nextYear,
      date: newDate.getDate()
    }
  })

  return days
}

function onShowCalendar () {
  // days before ()
  // days in month
  // days after
  const month = parseInt(monthEl[0].value)
  const year = parseInt(yearEl.value)

  const datesBefore = getDaysBefore(month, year)
  const datesCurrentMonth = getDaysInMonth(month, year)
  const datesAfter = getDaysAfter(month, year)
  
  const newArr = [...datesBefore, ...datesCurrentMonth, ...datesAfter]
  renderCalendar(newArr)
}

function renderCalendar (dates) {
  calendarEl.innerHTML = ""
  let rowCounter = 0
  let html = ""
  for (let i = 0; i < dates.length; i++) {
    if (i === 0) {
      html += `<div class="row">`
      for (let j = 0; j < dayNames.length; j++) {
        const index = j + 1 >= 7 ? j + 1 - 7 : j + 1
        html += `<div class="block">${dayNames[index]}</div>`
      }
      html += `</div>`
    }
    if (i % dayNames.length === 0) {
      html += `<div class="row" id="row-${rowCounter}">`
      rowCounter++
    }

    html += `<div class="block">${dates[i].date}</div>`
      // const row = document.getElementById("row-" + rowCounter)
      // row.classList.add("row")

      // const col = document.createElement("DIV")
      // const colText = document.createTextNode(dates[i].date)
      // col.appendChild(colText)
      // row.appendChild(col)
      
    if (i == rowCounter * dayNames.length - 1) {
      html += `</div>`
    }
  }
  calendarEl.innerHTML = html
}

function renderMonthSelector () {
  let html = ""
  monthNames.map((month, index) => {
    html += `<option value="${index}">${month}</option>`
  })

  monthSelector.innerHTML = html
}
// data hari
// data bulan
// input bulan dan tahun 
// ambil banyak hari pada bulan m, tahun y
// render

function init () {
  renderMonthSelector()
}

init()