// UTM and source tracking utility
export function getUTMParameters() {
  const urlParams = new URLSearchParams(window.location.search)
  const utmParams = {}
  
  // Standard UTM parameters
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
  
  utmKeys.forEach(key => {
    const value = urlParams.get(key)
    if (value) {
      utmParams[key] = value
    }
  })
  
  // Also check for non-standard source parameters
  const sourceKeys = ['source', 'ref', 'referrer']
  sourceKeys.forEach(key => {
    const value = urlParams.get(key)
    if (value && !utmParams.utm_source) {
      utmParams.source = value
    }
  })
  
  return utmParams
}

export function getReferrerInfo() {
  return {
    referrer: document.referrer || 'direct',
    landingPage: window.location.href,
    timestamp: new Date().toISOString()
  }
}

export function getDeviceInfo() {
  return {
    userAgent: navigator.userAgent,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  }
}

export function storeTrackingData() {
  const utmParams = getUTMParameters()
  const referrerInfo = getReferrerInfo()
  const deviceInfo = getDeviceInfo()
  
  const trackingData = {
    ...utmParams,
    ...referrerInfo,
    ...deviceInfo,
    firstVisit: !sessionStorage.getItem('contwre_visited')
  }
  
  // Store in sessionStorage for persistence across page navigation
  if (Object.keys(utmParams).length > 0 || !sessionStorage.getItem('contwre_tracking')) {
    sessionStorage.setItem('contwre_tracking', JSON.stringify(trackingData))
    sessionStorage.setItem('contwre_visited', 'true')
  }
  
  return trackingData
}

export function getStoredTrackingData() {
  const stored = sessionStorage.getItem('contwre_tracking')
  if (stored) {
    return JSON.parse(stored)
  }
  
  // If no stored data, get current data
  return storeTrackingData()
}


