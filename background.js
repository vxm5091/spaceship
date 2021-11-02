const openTab = url => browser.tabs.create({ url }).then(msg => console.log('success', msg), err => console.log('error', err))


// background listener for shortcut -> maps all current URLs to an array and invokes browser.tabs API
browser.commands.onCommand.addListener(command => {
  if (command == "liftoff") {
    browser.storage.local.get()
      .then(objects => Object.keys(objects).map(url => openTab(url)))
      .catch(err => "OPEN TAB ERROR", err)
  }
})


