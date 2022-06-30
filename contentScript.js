class View {
  show(pageContent) { }
}

class PageProcessor {
  run(page, classes) { }
}

class HtmlParser {
  parse(text) { }
}

class GetAnswersUseCase {
  htmlParser;
  pageProcessor;
  view;

  constructor(htmlParser, pageProcessor, view) {
    this.htmlParser = htmlParser
    this.pageProcessor = pageProcessor
    this.view = view
  }

  run(taskPageText) {
    const newPage = this.htmlParser.parse(taskPageText)

    const logo = document.getElementsByClassName('sg-logo__image')[0]

    this.pageProcessor.run(newPage)

    if (logo) this.view.show(newPage)
  }
}

class RemoveAds extends PageProcessor {
  run(page) {
    const classes = [
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
    ]

    for (let i = 0; i < classes.length; i++) {
      const nodesFound = page.getElementsByClassName(classes[i])
      if (nodesFound)
        while (nodesFound.length > 0)
          nodesFound[0].remove()
    }
  }
}

class NewTab extends View {
  show(pageContent) {
    open('', '', 'height=700,width=700').document.write(new XMLSerializer().serializeToString(pageContent));
  }
}

class DownloadFile extends View {
  show(pageContent) {
    let a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(pageContent)], { type: 'text/html' }));
    a.download = 'test.html';

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

class TextToHTML extends HtmlParser {
  parse(str) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, 'text/html');

    return doc
  }
}

const getAnswersUseCase = new GetAnswersUseCase(new TextToHTML(), new RemoveAds(), new NewTab())

const getTask = () => {
  const Http = new XMLHttpRequest();
  const url = window.location;
  Http.open("GET", url);
  Http.send();

  Http.onload = () => {
    getAnswersUseCase.run(Http.responseText)
  }
}

getTask()
