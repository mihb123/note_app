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