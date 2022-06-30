let p = 0

const run = () => {
  const Http = new XMLHttpRequest();
  const url = window.location;
  Http.open("GET", url);
  Http.send();

  Http.onreadystatechange = (e) => {
    const newPage = stringToHTML(Http.responseText)

    const logo = document.getElementsByClassName('sg-logo__image')[0]

    removeAds(newPage, [
      'brn-header-container  ',
      'sg-space-ignore',
      'js-page-footer',
      'js-react-app-billboard-above-footer',
      'js-react-newest-questions',
      'brn-ads-box',
      'brn-placeholder__animation-box',
      'brn-placeholder__animation',
      'js-react-below-answers',
      'js-react-nearest-questions-navigation',
    ])


    console.log(newPage.body)

    if (p == 2 && logo) open('', '', 'height=700,width=700').document.write(new XMLSerializer().serializeToString(newPage));

    p++
  }
}

const removeAds = (node, ads) => {
  for (let i = 0; i < ads.length; i++) {
    const ad = node.getElementsByClassName(ads[i])
    if (ad)
      while (ad.length > 0)
        ad[0].remove()
  }
}

const downloadFile = function (content) {
  let a = window.document.createElement('a');
  a.href = window.URL.createObjectURL(new Blob([content], { type: 'text/html' }));
  a.download = 'test.html';

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

var stringToHTML = function (str) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(str, 'text/html');

  return doc
};

run()
