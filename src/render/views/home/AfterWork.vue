<template>
  <div class="after-work">
    <div class="label">
      距离下班还有
    </div>
    <div class="time-card-wrap">
      <div class="hour">
        {{ state.h }}H
      </div>
      <div class="minutes">
        {{ state.m }}M
      </div>
      <div class="seconds">
        {{ state.s }}S
      </div>
    </div>
    <div class="label">
      距离下个假期还有
    </div>
    <div class="time-card-wrap">
      <div class="day">
        {{ state.h }}D
      </div>
      <div class="hour">
        {{ state.h2 }}H
      </div>
      <div class="minutes">
        {{ state.m2 }}M
      </div>
      <div class="seconds">
        {{ state.s2 }}S
      </div>
    </div>
    <div class="w-full text-secondary text-align-left">
      当前时间: 2025-02-08 10:45:57
    </div>
  </div>
</template>

<script lang="ts" setup>

const state = reactive({
  h: 0,
  m: 0,
  s: 0,
  d: 0,
  h2: 0,
  m2: 0,
  s2: 0,
})

function updateCountdown() {
  const now = new Date()
  const workEndTime = new Date()
  workEndTime.setHours(18, 0, 0, 0) // 设定下班时间 18:00:00

  const holidayTime = new Date('2025-02-15T00:00:00') // 设定假期时间

  const timeDiffWork = +workEndTime - +now
  const timeDiffHoliday = +holidayTime - +now

  function formatTime(diff: number) {
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    return [hours, minutes, seconds]
  }

  function formatHolidayTime(diff: number) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    return [days, hours, minutes, seconds]
  }

  const [h, m, s] = formatTime(timeDiffWork)
  const [d, h2, m2, s2] = formatHolidayTime(timeDiffHoliday)

  state.h = h
  state.m = m
  state.s = s
  state.d = d
  state.h2 = h2
  state.m2 = m2
  state.s2 = s2
}
setInterval(updateCountdown, 1000)
</script>

<style scoped lang="less">

.after-work {
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 6px;
}

.label {
  font-size: 18px;
  margin-bottom: 6px;
  font-weight: bold;
  color: var(--color-text-secondary);
  text-align: left;
  width: 100%;
}

.time-card-wrap {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  //margin-top: 6px;
  gap: 12px;
  margin-bottom: 12px;
  width: 100%;

  > div {
    color: #fff;
    background: var(--color-primary-light);
    padding: 6px 0;
    min-width: 40px;
    width: 50px;
    //height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    //margin-right: 10px;
    border-radius: 4px;
    font-family: Arial, sans-serif;
    font-size: 20px;
    font-weight: bold;
  }
}
</style>
