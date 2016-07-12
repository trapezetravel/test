// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var store = [];
//in the future this store will be populated from local storage
//store is not persisted between different clicks right now

function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];
    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab

    callback(tab.url, tab.title, tab.favIconUrl);
  });
}

function renderStatus(url, title, favIconUrl) {
  //document.getElementById('url').textContent = url
  document.getElementById('title').textContent = title;
  document.getElementById('favIconUrl').src = favIconUrl;
  //document object with getelementbyID function on it
  var object = {
    url: url,
    title: title,
    favIconUrl: favIconUrl,
  };
  store.push(object);
  saveChanges();
  //calling the function saveChanges which is defined at the bottom
}

function ready() {
  document.addEventListener('DOMContentLoaded', function() {
    loadStore(function() {
      //document is an object, it has a method called addEventListener
      //DOMContentLoaded makes sure the tab was done loading
      getCurrentTabUrl(renderStatus);
      //this calls callback and passes it the parameters
      document.getElementById('SAVEbutton').addEventListener('click', saveTags);
      //this is the function I declare for you to call later, saveTags is not actually used here
      //hey document, get the save button, add the click event, whenever it's clicked, saveTags
    });
  });
}

function loadStore(callback) {
  chrome.storage.sync.get('store', function(result) {
    console.log('result:', result)
    if (result) {
      store = result.store
    }

    if (typeof callback === 'function') {
      callback();
    }
  });
}

function saveChanges(callback) {
  // Save the store array using the Chrome extension storage API.
  chrome.storage.sync.set({store: store}, function() {
    // Notify that we saved.
    console.log('Settings saved');
    if (typeof callback === 'function') callback(store);
  });
}
