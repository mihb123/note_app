export function getContent(item) {
  let data = ''
  if (item?.content) {
    data = JSON.parse(item.content);
  }
  let newContent = ''
  let checkedTask = 0
  let allTask = 0
  if (data) {
    if (data?.content?.length) {
      data.content.map((e) => {
        if (e.type == "taskList") {
          allTask += e.content.length
          e.content.map((e) => {
            if (e?.attrs?.checked) {
              checkedTask++
            }
            e?.content?.map((e) => {
              e?.content?.map((e) => {
                if (e?.hasOwnProperty("text")) {
                  newContent += e.text + ' '
                }
              })
            })
          })
        } else if (e.type == "bulletList" || e.type == "orderedList") {
          e.content.map((e) => {
            e.content.map((e) => {
              e.content.map((e) => {
                if (e.hasOwnProperty("text")) {
                  newContent += e.text + ' '
                }
              })
            })
          })
        } else {
          if (e.hasOwnProperty("content")) {
            e.content.map((e) => {
              if (e.hasOwnProperty("text")) {
                newContent += e.text + ' '
              }
            })
          }
        }
      })
    }
    return { newContent, checkedTask, allTask }
  }
  newContent = 'Nothing'
  return { newContent }
}

export function GetTime({ minutes, setTimeAgo }) {
  const hour = 60
  const day = 24 * hour
  const month = 30 * day
  const year = 12 * month
  if (minutes < hour) {
    setTimeAgo(minutes > 0 ? `Cập nhật ${minutes} phút trước` : "Vừa xong");
  } else if (hour < minutes && minutes <= day) {
    const hours = Math.floor(minutes / hour)
    setTimeAgo(`Cập nhật ${hours} giờ trước`)
  } else if (day < minutes && minutes <= month) {
    const days = Math.floor(minutes / day)
    setTimeAgo(`Cập nhật ${days} ngày trước`)
  } else if (month < minutes && minutes <= year) {
    const months = Math.floor(minutes / month)
    setTimeAgo(`Cập nhật ${months} tháng trước`)
  }
}