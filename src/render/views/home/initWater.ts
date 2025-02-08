// water.ts

interface WeatherWidgetConfig {
  t: string;
  lang: string;
  sl_lpl: number;
  ids: string[];
  font: string;
  sl_ics: string;
  sl_sot: string;
  cl_bkg: string;
  cl_font: string;
  cl_cloud: string;
  cl_persp: string;
  cl_sun: string;
  cl_moon: string;
  cl_thund: string;
}

interface WeatherWidgetResponse {
  a?: {
    html?: string;
    style?: string;
    jsCode?: string;
    ub?: string;
  };
  error_code?: number;
  error_msg?: string;
}

const obj: WeatherWidgetConfig = {
  t: 'horizontal', // responsive
  lang: 'zh',
  sl_lpl: 1,
  ids: ['wl3562'],
  font: 'Arial',
  sl_ics: 'one_a',
  sl_sot: 'celsius',
  cl_bkg: '#303F9F00',
  cl_font: '#24af47',
  cl_cloud: '#24af47',
  cl_persp: '#81D4FA',
  cl_sun: '#FFC107',
  cl_moon: '#FFC107',
  cl_thund: '#FF5722',
  // el_phw: 3,
}

function updateOnPage(data: string, id: string): void {
  let parsedData: WeatherWidgetResponse
  try {
    parsedData = JSON.parse(data)
  } catch (error) {
    console.error('Failed to parse JSON:', error)
    return
  }

  if (parsedData.a) {
    if (parsedData.a.html) {
      document.getElementById(id)!.innerHTML = parsedData.a.html
    }
    if (parsedData.a.style) {
      document.getElementById(id)!.style.cssText = parsedData.a.style
    }
    if (parsedData.a.jsCode) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = false
      script.text = parsedData.a.jsCode
      document.getElementsByTagName('head')[0].appendChild(script)
    }
  } else if (parsedData.error_code) {
    document.getElementById(id)!.innerHTML = ''
    console.log(`weatherwidget.org / Error: ${parsedData.error_msg} (Error code ${parsedData.error_code})`)
  }
}

function requestGet(url: string, callback: any, id: string, gen: number): void {
  const request = new XMLHttpRequest()
  request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
      callback(id, request.responseText, gen)
    }
  }
  request.open('GET', url)
  request.send()
}

function requestPost(url: string, callback: any, params: string, id: string): void {
  const request = new XMLHttpRequest()
  request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
      callback(request.responseText, id)
    }
  }
  request.open('POST', url, true)
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  request.send(params)
}

function getDataFromApi(id: string, i: boolean, gen: number): void {
  const v = '1.3'
  const a = JSON.stringify(obj)
  const l = 'id'
  // const u = ''
  // const ub = ''
  const u = `${document.getElementById(`${id}_u`)?.getAttribute('href')}|||${document.getElementById(`${id}_u`)?.innerHTML}`
  const ub = gen === 1 ? '' : document.getElementById(id)?.innerHTML || ''
  const params = `v=${v}&a=${a}&l=${l}&u=${u}&ub=${ub}&i=${i}&g=${gen}&id=${id}`
  requestPost('https://app3.weatherwidget.org/data/', updateOnPage, params, id)
}

function collectData(id: string, gen: number): void {
  if (document.getElementById(id)?.getAttribute('loc') === 'auto') {
    requestGet('https://ip2.weatherwidget.org/', getDataFromApi, id, gen)
  } else {
    getDataFromApi(id, false, gen)
  }
}

function updateWidget(id: string, gen: number): void {
  collectData(id, gen)
}

export default function initWeather(): void {
  updateWidget('ww_c13c2eacc94f1', 0)
}

// <script async src="https://app3.weatherwidget.org/js/?id=ww_c13c2eacc94f1"></script>
// <div id="ww_3d35a761112d0" v='1.3' loc='id' a='{"t":"responsive","lang":"zh","sl_lpl":1,"ids":[],"font":"Arial","sl_ics":"one_a","sl_sot":"celsius","cl_bkg":"image","cl_font":"#FFFFFF","cl_cloud":"#FFFFFF","cl_persp":"#81D4FA","cl_sun":"#FFC107","cl_moon":"#FFC107","cl_thund":"#FF5722"}'><a href="https://weatherwidget.org/" id="ww_3d35a761112d0_u" target="_blank">Free weather widget</a></div><script async src="https://app3.weatherwidget.org/js/?id=ww_3d35a761112d0"></script>
