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
  return new Date(year, parseInt(month) + 1, 0).getDate();
}

function showCalendar () {
  const month = document.getElementsByName("month")[0].value
  const year = document.getElementById("year").value
  const countDays = getDays(month, year)
  const arrDays = Array(countDays).fill(0).map((x, index) => { return {year: parseInt(year), month: parseInt(month), text: index + 1}})

  const firstDate = new Date(year, month, 1).getDay()
  const lastDate = new Date(year, parseInt(month) + 1, 0).getDay()

  const dateBefore = new Date(year, month, 0).getDate()
  
  const prevDay = firstDate != 0 ? firstDate - 1 : 6
  let daysBefore = []
  for (var i = (dateBefore + 1) - prevDay; i <= dateBefore; i++) {
    daysBefore.push({year: month == 0 ? parseInt(year) - 1 : year, month: month == 0 ? 11 : parseInt(month) - 1, text: i})
  }
  
  let daysAfter = []
  if (lastDate != 0) {
    const nextDay = Math.abs(lastDate - 7)
    for (var i = 1; i <= nextDay; i++) {
      daysAfter.push({year: month == 11 ? parseInt(year) + 1 : year, month: month == 11 ? 0 : parseInt(month) + 1, text: i})
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
      if (x.month == 11) {
        console.log(x)
      }
      const date = new Date(x.year, x.month, x.text)
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
  const month = document.getElementsByName("month")[0].value
  days.map((val1, idx1) => {
    const index = idx1
    const dayEl = document.getElementById("day-" + index)
    data[index].map((val, idx) => {
      const block = document.createElement("DIV")
      const text = document.createTextNode(val.text)
      if (val.month != parseInt(month)) {
        block.classList.add("other-tgl")
      } else {
        block.classList.add("tgl")
      }
      
      block.appendChild(text)
      dayEl.appendChild(block)
    })
  })
}

renderMonth()

