export function getContent(item) {
  'use client'

  const data = item?.content ? JSON.parse(item.content) : null;
  if (!data?.content?.length) return { newContent: 'Nothing', checkedTask: 0, allTask: 0 };

  const result = data.content.reduce((acc, element) => {
    if (element.type === "taskList") {
      const taskStats = element.content.reduce((tasks, task) => ({
        checked: tasks.checked + (task?.attrs?.checked ? 1 : 0),
        text: tasks.text + extractText(task)
      }), { checked: 0, text: '' });

      return {
        newContent: acc.newContent + taskStats.text,
        checkedTask: acc.checkedTask + taskStats.checked,
        allTask: acc.allTask + element.content.length
      };
    }

    if (["bulletList", "orderedList"].includes(element.type)) {
      const listText = element.content.reduce((text, list) => text + extractText(list), '');
      return { ...acc, newContent: acc.newContent + listText };
    }

    return { ...acc, newContent: acc.newContent + extractText(element) };
  }, { newContent: '', checkedTask: 0, allTask: 0 });

  return result;
}

const extractText = (node) => {
  if (!node?.content) return node?.text ? `${node.text} ` : '';
  return node.content.reduce((text, child) => text + extractText(child), '');
};
