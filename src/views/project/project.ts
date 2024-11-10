// 创建项目的基础路径
/**
 * project
 * - home // 源代码
 * - design // 设计
 * - document // 文档
 * - task // 任务
 */


// 按照语言分类
export const LanguageOptions = [
  { label: '前端', value: 'javaScript' },
  { label: 'java', value: 'java' },
  { label: 'electron', value: 'electron' },
]

// 按照类型分
export const TypeOptions = [
  { label: '项目', value: 'project' },
  { label: '工具', value: 'lib' },
  { label: '个人', value: 'self' },
]

export function getLanguageName(value?: string) {
  return LanguageOptions.find(item =>item.value === value)?.label
}
export function getTypeName(value?: string) {
  return TypeOptions.find(item =>item.value === value)?.label
}
