class Destination {
  constructor(URL) {
    this.URL = URL;
    // create container for hyperlink + remove button
    this.container = $("<div class='link-container'></div>")
    this.item = $("<a href=''></a>")
    
    // update hyperlink and label and append to container
    this.item.attr("href", URL)
    this.item.html(URL)
    $(this.container).append(this.item)

    // append delete button and bind onClick listener
    this.delete = $("<button type='button'>x</button>")
    $(this.container).append(this.delete)
    this.delete.on('click', () => {
      browser.storage.local.remove(this.URL)
        .then(success => this.container.remove())
        .catch(err => console.error("Error removing URl link", err))
    })
  }
}

  browser.storage.local.get()
    .then(objects => {
        const keysArr = Object.keys(objects);
      keysArr.map(url => {
        appendDestination(url)
      })
    })

  $('#add-url').on('click', e => addURL(e))

  const addURL = (e) => {
    e.preventDefault();
    const URL = $("#url-input").val();
    $("#url-input").val('')
    
    const newObj = {}
    newObj[URL] = URL;
    browser.storage.local.set(newObj)
      .then(_ => appendDestination(URL))
      .catch(err => console.error("Error adding URL", err))
  }

  const appendDestination = (URL) => {
    const newDestination = new Destination(URL)
    $("#link-manager").append(newDestination.container)
    console.error(`${URL} added successfully!`)
  }

  const openTab = url => browser.tabs.create({ url }).then(msg => console.log('success', msg), err => console.error('error', err))
  