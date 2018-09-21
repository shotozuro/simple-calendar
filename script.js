const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
]

const days = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu"
]
let data = []
const monthSelector = document.getElementById("month")
const cal = document.getElementById("calendar")
document.getElementById("submit").addEventListener("click", showCalendar)

function renderMonth () {
  let opt = ""
  months.map((month, index) => {
    opt += `<option value="${index}">${month}</option>`
  })
  monthSelector.innerHTML = opt
}

function getDays (month, year) {
  return 32 - new Date(year, month, 32).getDate();
}

function showCalendar () {
  const month = document.getElementsByName("month")[0].value
  const year = document.getElementById("year").value
  const countDays = getDays(month, year)
  const arrDays = Array(countDays).fill(0).map((x, index) => { return {month: parseInt(month), text: index + 1}})

  const firstDate = new Date(year, month, 1).getDay()
  const lastDate = new Date(year, parseInt(month) + 1, 0).getDay()

  const dateBefore = new Date(year, month, 0).getDate()
  
  let daysBefore = []
  // if (firstDate == 0) {
  //   prevDay = 6
  // } else {
  //   lastDate - 1
  // }
  for (var i = dateBefore - firstDate + 2; i <= dateBefore; i++) {
    daysBefore.push({month: month - 1 < 0 ? 12 : month - 1, text: i})
  }
  
  let daysAfter = []
  if (lastDate != 0) {
    const nextDay = Math.abs(lastDate - 7)
    for (var i = 1; i <= nextDay; i++) {
      daysAfter.push({month: parseInt(month) + 1, text: i})
    }
  }
  

  const newArr1 = daysBefore.concat(arrDays)
  const newArr = newArr1.concat(daysAfter)
  data = newArr.map((val, idx) => {
    return filterDateByDay(newArr, idx, year, month)
  })
  render()
}

function filterDateByDay (arr, day, year, month) {
  return arr.filter(x => {
      const date = new Date(year, x.month, x.text)
      return day == date.getDay()
  })
}

function render () {
  renderDays()
  renderRow()
}

function renderDays () {
  let html = ""
  for (var i = 0; i < days.length; i++) {
    const index = i + 1 == 7 ? 0 : i + 1
    html += `<div style="text-align:center">${days[index]}<div class="col" id="day-${index}"></div></div>`
  }

  cal.innerHTML = html

}

function renderRow () {
  let html = ""
  days.map((val1, idx1) => {
    const index = idx1
    const dayEl = document.getElementById("day-" + index)
    data[index].map((val, idx) => {
      const block = document.createElement("DIV")
      const text = document.createTextNode(val.text)
      block.classList.add("tgl")
      block.appendChild(text)
      dayEl.appendChild(block)
    })
  })
}

renderMonth()

