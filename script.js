(function(){
    var script = {
 "scripts": {
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "existsKey": function(key){  return key in window; },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "unregisterKey": function(key){  delete window[key]; },
  "getKey": function(key){  return window[key]; },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "registerKey": function(key, value){  window[key] = value; },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); }
 },
 "children": [
  "this.MainViewer",
  "this.Container_5A0DC4CF_5772_E32E_41CD_F6650DCF6BF2",
  "this.Container_46D2A939_57B6_2572_41BD_BAA93AA47AA5",
  "this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8"
 ],
 "id": "rootPlayer",
 "buttonToggleFullscreen": "this.IconButton_5A0D14CF_5772_E32E_4158_F5607133AB8C",
 "defaultVRPointer": "laser",
 "class": "Player",
 "start": "this.playAudioList([this.audio_3474E1DB_05BF_06CA_4181_847828A6CE51]); this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_5A0D24CF_5772_E32E_41D2_D193D2C1028D], 'gyroscopeAvailable'); this.syncPlaylists([this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.IconButton_5A0D14CF_5772_E32E_4158_F5607133AB8C].forEach(function(component) { component.set('visible', false); }) }",
 "downloadEnabled": false,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "width": "100%",
 "minHeight": 20,
 "borderRadius": 0,
 "overflow": "visible",
 "paddingRight": 0,
 "propagateClick": false,
 "verticalAlign": "top",
 "minWidth": 20,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "desktopMipmappingEnabled": false,
 "height": "100%",
 "definitions": [{
 "hfovMin": "135%",
 "label": "Senior Citizen",
 "id": "panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3",
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "thumbnailUrl": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_t.jpg",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C",
   "yaw": -123.46,
   "distance": 1,
   "backwardYaw": 53.35
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C",
   "yaw": 144.34,
   "distance": 1,
   "backwardYaw": -70.71
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_D4DC880E_C648_3EA0_41E5_7681453BB95E",
  "this.overlay_D3913796_C648_F1A0_41DE_57F3C742BCAA"
 ],
 "partial": false
},
{
 "hfovMin": "135%",
 "label": "Tennis court ",
 "id": "panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C",
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "thumbnailUrl": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_t.jpg",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3",
   "yaw": 53.35,
   "distance": 1,
   "backwardYaw": -123.46
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA",
   "yaw": -125.47,
   "distance": 1,
   "backwardYaw": -91.81
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_D566BD25_C648_16E0_41DA_7B5329E8F533",
  "this.overlay_D2F5D202_C658_72A0_41E6_943C7F248E3A"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "hfovMin": "135%",
 "label": "Children play area",
 "id": "panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9",
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "thumbnailUrl": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_t.jpg",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03",
   "yaw": 133.8,
   "distance": 1,
   "backwardYaw": 157.91
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CB286B53_C648_12A0_41CE_C15E45AC9836",
   "yaw": -107.08,
   "distance": 1,
   "backwardYaw": -45.18
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_C9196D8F_C658_11A0_41AF_17CE6B9C167C",
  "this.overlay_C8A72E70_C658_3360_41D7_91663109CC70"
 ],
 "partial": false
},
{
 "hfovMin": "135%",
 "label": "Amphitheatre",
 "id": "panorama_CB503455_C648_16A0_41CF_FF7584B17D37",
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "thumbnailUrl": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_t.jpg",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CB5546BC_C648_33E0_41E6_9A599596894C",
   "yaw": 58.92,
   "distance": 1,
   "backwardYaw": -120.2
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_D737E693_C648_73A0_41DD_FBE8F38DA3C2",
  "this.overlay_D42BD371_C678_1160_41A6_0D1EDDF8E6C5"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -121.08,
  "pitch": 0
 },
 "id": "camera_D16B8E06_C6C8_32A0_41DD_737CEDD004DD",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "hfovMin": "135%",
 "label": "Bounce Land",
 "id": "panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F",
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "thumbnailUrl": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_t.jpg",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C",
   "yaw": -4.63,
   "distance": 1,
   "backwardYaw": -175.72
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_D53DFF54_C648_32A0_41E5_5EA08476668E"
 ],
 "partial": false
},
{
 "hfovMin": "135%",
 "label": "Jungle Area",
 "id": "panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C",
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "thumbnailUrl": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_t.jpg",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F",
   "yaw": -175.72,
   "distance": 1,
   "backwardYaw": -4.63
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3",
   "yaw": -70.71,
   "distance": 1,
   "backwardYaw": 144.34
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_D57BA8C6_C648_FFA0_41D8_8318277867E7",
  "this.overlay_D25DBA7A_C648_7360_41CC_915449C35C0D"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 56.54,
  "pitch": 0
 },
 "id": "camera_D1201D26_C6C8_36E0_41A0_1A7FF6B30609",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "buttonCardboardView": [
  "this.IconButton_5A0D54CF_5772_E32E_41CC_563BC5A99C44",
  "this.IconButton_46D29939_57B6_2572_4181_A29735EA1C2F"
 ],
 "gyroscopeVerticalDraggingEnabled": true,
 "id": "MainViewerPanoramaPlayer",
 "displayPlaybackBar": true,
 "touchControlMode": "drag_rotation",
 "buttonToggleHotspots": "this.IconButton_5A0D04CF_5772_E32E_41BB_81FF7DA1667F",
 "gyroscopeEnabled": true,
 "class": "PanoramaPlayer",
 "mouseControlMode": "drag_acceleration",
 "viewerArea": "this.MainViewer",
 "buttonToggleGyroscope": "this.IconButton_5A0D24CF_5772_E32E_41D2_D193D2C1028D"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 109.29,
  "pitch": 0
 },
 "id": "camera_D1D08BF8_C6C8_3160_41E1_42CC1955718C",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_CB503455_C648_16A0_41CF_FF7584B17D37_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -22.09,
  "pitch": 0
 },
 "id": "camera_D1A58B7A_C6C8_3160_41CD_EE0465BB05F5",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 54.53,
  "pitch": 0
 },
 "id": "camera_D11ABCC7_C6C8_37A0_419E_4E36479B162D",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "thumbnailUrl": "media/photo_769C2E67_7A53_D73C_41AF_9CA58A04F3AE_t.jpg",
 "label": "Living _Hi res 2",
 "id": "photo_769C2E67_7A53_D73C_41AF_9CA58A04F3AE",
 "width": 4000,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_769C2E67_7A53_D73C_41AF_9CA58A04F3AE.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "duration": 5000,
 "height": 2250
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 134.82,
  "pitch": 0
 },
 "id": "camera_D1BD3B89_C6C8_31A0_41E2_BE9B0417C214",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 175.37,
  "pitch": 0
 },
 "id": "camera_D1F5DC48_C6C8_36A0_41CC_F50CC6FD3A5E",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -46.2,
  "pitch": 0
 },
 "id": "camera_D12F0CF6_C6C8_3760_41C0_06999620AF31",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -35.66,
  "pitch": 0
 },
 "id": "camera_D106EC87_C6C8_37A0_41E4_2A3944947EDD",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -126.65,
  "pitch": 0
 },
 "id": "camera_D1DACBE9_C6C8_3160_41D0_079FF422F0BB",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 0, 1)",
   "media": "this.panorama_CB286B53_C648_12A0_41CE_C15E45AC9836",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 1, 2)",
   "media": "this.panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 2, 3)",
   "media": "this.panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 3, 4)",
   "media": "this.panorama_CB57721D_C648_72A0_41E3_FAC6439D7805",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CB503455_C648_16A0_41CF_FF7584B17D37_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 4, 5)",
   "media": "this.panorama_CB503455_C648_16A0_41CF_FF7584B17D37",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CB5546BC_C648_33E0_41E6_9A599596894C_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 5, 6)",
   "media": "this.panorama_CB5546BC_C648_33E0_41E6_9A599596894C",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 6, 7)",
   "media": "this.panorama_CB5D789E_C648_1FA0_41DF_496B2603085E",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 7, 8)",
   "media": "this.panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 8, 9)",
   "media": "this.panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 9, 10)",
   "media": "this.panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 10, 11)",
   "media": "this.panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 11, 0)",
   "media": "this.panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ],
 "id": "DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist"
},
{
 "hfovMin": "135%",
 "label": "Swimming pool",
 "id": "panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03",
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "thumbnailUrl": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_t.jpg",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CB57721D_C648_72A0_41E3_FAC6439D7805",
   "yaw": -86.53,
   "distance": 1,
   "backwardYaw": 166.2
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9",
   "yaw": 157.91,
   "distance": 1,
   "backwardYaw": 133.8
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_C980AAD4_C658_F3A0_41B9_D335A00014D9",
  "this.overlay_D3AAF2E8_C658_1360_41BC_F73E95F14A08"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -11.54,
  "pitch": 0
 },
 "id": "camera_D17CDE34_C6C8_32E0_41DF_D11842B65203",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "class": "MediaAudio",
 "audio": {
  "class": "AudioResource",
  "mp3Url": "media/audio_3474E1DB_05BF_06CA_4181_847828A6CE51.mp3",
  "oggUrl": "media/audio_3474E1DB_05BF_06CA_4181_847828A6CE51.ogg"
 },
 "autoplay": true,
 "id": "audio_3474E1DB_05BF_06CA_4181_847828A6CE51",
 "data": {
  "label": "Romantic"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "thumbnailUrl": "media/photo_765FF95D_7A52_BD0C_41D4_3173C32E180D_t.jpg",
 "label": "Parents Bedroom_Hi res",
 "id": "photo_765FF95D_7A52_BD0C_41D4_3173C32E180D",
 "width": 4000,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_765FF95D_7A52_BD0C_41D4_3173C32E180D.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "duration": 5000,
 "height": 2250
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 72.92,
  "pitch": 0
 },
 "id": "camera_D1472D97_C6C8_31A0_41D5_EF14D5C20777",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 76.13,
  "pitch": 0
 },
 "id": "camera_D1585DD0_C6C8_31A1_41E8_2A65A4DAB121",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -13.8,
  "pitch": 0
 },
 "id": "camera_D1E8DC18_C6C8_36A0_41E6_43A50D88418F",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 59.8,
  "pitch": 0
 },
 "id": "camera_D1CCCBBA_C6C8_31E0_41E1_142E73626E13",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "hfovMin": "135%",
 "label": "Kids pool ",
 "id": "panorama_CB57721D_C648_72A0_41E3_FAC6439D7805",
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "thumbnailUrl": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_t.jpg",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03",
   "yaw": 166.2,
   "distance": 1,
   "backwardYaw": -86.53
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CB503455_C648_16A0_41CF_FF7584B17D37"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_D6AA6DD5_C648_71A0_41DA_F45F8F8D5CD9",
  "this.overlay_D665BC0C_C648_F6A0_41DE_331CD3F5972B"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "thumbnailUrl": "media/photo_7672A840_7A52_5B75_41D6_811C88787749_t.jpg",
 "label": "Master Bedroom _Hi res",
 "id": "photo_7672A840_7A52_5B75_41D6_811C88787749",
 "width": 4000,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_7672A840_7A52_5B75_41D6_811C88787749.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "duration": 5000,
 "height": 2500
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 93.47,
  "pitch": 0
 },
 "id": "camera_D1B7EB99_C6C8_31A0_41D8_7CE510941A33",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "hfovMin": "135%",
 "label": "Tree House",
 "id": "panorama_CB286B53_C648_12A0_41CE_C15E45AC9836",
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "thumbnailUrl": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_t.jpg",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9",
   "yaw": -45.18,
   "distance": 1,
   "backwardYaw": -107.08
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_C994B4EE_C648_3760_41E6_517AAD9B63F0",
  "this.overlay_D1F2775B_C6B8_32A0_41D0_E538B6AC53CC"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 88.19,
  "pitch": 0
 },
 "id": "camera_D1341D66_C6C8_3160_41E4_EB6F1340AB1D",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 139.19,
  "pitch": 0
 },
 "id": "camera_DE8FCE75_C6C8_3360_41C5_67905BF160A3",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 4.28,
  "pitch": 0
 },
 "id": "camera_D1C52BC9_C6C8_31A0_41DB_6C9F9E22A87E",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "thumbnailUrl": "media/photo_767255C6_7A52_557C_41DD_51216B6F3598_t.jpg",
 "label": "Kitchen_Hi res",
 "id": "photo_767255C6_7A52_557C_41DD_51216B6F3598",
 "width": 4000,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_767255C6_7A52_557C_41DD_51216B6F3598.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "duration": 5000,
 "height": 3334
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -46.2,
  "pitch": 0
 },
 "id": "camera_D1FEDC29_C6C8_36E0_41E8_668A33BE5E95",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "media": "this.panorama_CB286B53_C648_12A0_41CE_C15E45AC9836",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "media": "this.panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "media": "this.panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "media": "this.panorama_CB57721D_C648_72A0_41E3_FAC6439D7805",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CB503455_C648_16A0_41CF_FF7584B17D37_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "media": "this.panorama_CB503455_C648_16A0_41CF_FF7584B17D37",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CB5546BC_C648_33E0_41E6_9A599596894C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "media": "this.panorama_CB5546BC_C648_33E0_41E6_9A599596894C",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "media": "this.panorama_CB5D789E_C648_1FA0_41DF_496B2603085E",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "media": "this.panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "media": "this.panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "media": "this.panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "media": "this.panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "end": "this.trigger('tourEnded')",
   "player": "this.MainViewerPanoramaPlayer",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 0)",
   "media": "this.panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F",
   "camera": "this.panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_camera"
  }
 ],
 "id": "mainPlayList"
},
{
 "hfovMin": "135%",
 "label": "Fruit tree orchard",
 "id": "panorama_CB5D789E_C648_1FA0_41DF_496B2603085E",
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "thumbnailUrl": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_t.jpg",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CB5546BC_C648_33E0_41E6_9A599596894C",
   "yaw": -103.87,
   "distance": 1,
   "backwardYaw": 168.46
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA",
   "yaw": 133.8,
   "distance": 1,
   "backwardYaw": -40.81
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_D429EB9C_C679_F1A0_41DE_FA83845518BB",
  "this.overlay_D3D00797_C658_31A0_41DD_47DB9BB0B6D3"
 ],
 "partial": false
},
{
 "hfovMin": "135%",
 "label": "Party Lawn",
 "id": "panorama_CB5546BC_C648_33E0_41E6_9A599596894C",
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "thumbnailUrl": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_t.jpg",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CB5D789E_C648_1FA0_41DF_496B2603085E",
   "yaw": 168.46,
   "distance": 1,
   "backwardYaw": -103.87
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CB503455_C648_16A0_41CF_FF7584B17D37",
   "yaw": -120.2,
   "distance": 1,
   "backwardYaw": 58.92
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_D75FF815_C67F_FEA0_41B4_848B0814519C",
  "this.overlay_D05F5FCF_C658_31A0_41E6_482134EEA526"
 ],
 "partial": false
},
{
 "thumbnailUrl": "media/photo_765DDD36_7A52_D51C_41D4_71F91FECEBAB_t.jpg",
 "label": "Kids_Hi res",
 "id": "photo_765DDD36_7A52_D51C_41D4_71F91FECEBAB",
 "width": 4000,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_765DDD36_7A52_D51C_41D4_71F91FECEBAB.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "duration": 5000,
 "height": 2500
},
{
 "hfovMin": "135%",
 "label": "Basketball court ",
 "id": "panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA",
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "thumbnailUrl": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_t.jpg",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C",
   "yaw": -91.81,
   "distance": 1,
   "backwardYaw": -125.47
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CB5D789E_C648_1FA0_41DF_496B2603085E",
   "yaw": -40.81,
   "distance": 1,
   "backwardYaw": 133.8
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_D4364F5F_C678_F2A0_41B6_1A9DCC7E42E8",
  "this.overlay_D38EFB1B_C658_12A0_41D2_B522C073959F"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_CB5546BC_C648_33E0_41E6_9A599596894C_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "toolTipFontWeight": "normal",
 "playbackBarBackgroundColorDirection": "vertical",
 "id": "MainViewer",
 "left": 0,
 "playbackBarRight": 0,
 "class": "ViewerArea",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderSize": 0,
 "progressBarBorderRadius": 0,
 "width": "100%",
 "playbackBarBorderRadius": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "minHeight": 50,
 "playbackBarProgressBorderColor": "#000000",
 "toolTipFontStyle": "normal",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontFamily": "Arial",
 "progressLeft": 0,
 "paddingRight": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBorderRadius": 0,
 "height": "100%",
 "minWidth": 100,
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "toolTipShadowHorizontalLength": 0,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipFontColor": "#606060",
 "vrPointerSelectionTime": 2000,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "shadow": false,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "progressBarOpacity": 1,
 "borderSize": 0,
 "toolTipPaddingTop": 4,
 "toolTipDisplayTime": 600,
 "toolTipPaddingLeft": 6,
 "progressBorderSize": 0,
 "displayTooltipInTouchScreens": true,
 "progressBorderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "top": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBarBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "transitionDuration": 500,
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 5,
 "progressBorderColor": "#000000",
 "playbackBarLeft": 0,
 "toolTipShadowSpread": 0,
 "toolTipShadowBlurRadius": 3,
 "paddingBottom": 0,
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "toolTipBorderColor": "#767676",
 "toolTipFontSize": "1.11vmin",
 "paddingTop": 0,
 "toolTipPaddingBottom": 4,
 "paddingLeft": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "data": {
  "name": "Main Viewer"
 },
 "toolTipShadowColor": "#333333",
 "playbackBarHeight": 10,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6
},
{
 "children": [
  "this.Container_5A0D64CF_5772_E32E_41D0_3F190463451B",
  "this.Container_5A0D44CF_5772_E32E_41D0_19B23A64B7F8"
 ],
 "id": "Container_5A0DC4CF_5772_E32E_41CD_F6650DCF6BF2",
 "width": 115.05,
 "class": "Container",
 "borderSize": 0,
 "right": "0%",
 "backgroundOpacity": 0,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "borderRadius": 0,
 "overflow": "scroll",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "propagateClick": true,
 "verticalAlign": "top",
 "top": "0%",
 "minWidth": 1,
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "height": 641,
 "gap": 10,
 "scrollBarMargin": 2,
 "paddingBottom": 0,
 "paddingTop": 0,
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "contentOpaque": false,
 "shadow": false,
 "data": {
  "name": "--SETTINGS"
 },
 "layout": "absolute"
},
{
 "children": [
  "this.IconButton_46D29939_57B6_2572_4181_A29735EA1C2F"
 ],
 "id": "Container_46D2A939_57B6_2572_41BD_BAA93AA47AA5",
 "left": "0%",
 "class": "Container",
 "backgroundImageUrl": "skin/Container_46D2A939_57B6_2572_41BD_BAA93AA47AA5.png",
 "right": "0%",
 "borderSize": 0,
 "backgroundOpacity": 0.6,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "borderRadius": 0,
 "overflow": "visible",
 "paddingRight": 0,
 "propagateClick": true,
 "minWidth": 1,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "bottom": "0%",
 "scrollBarOpacity": 0.5,
 "height": "12.832%",
 "gap": 10,
 "scrollBarMargin": 2,
 "paddingBottom": 0,
 "verticalAlign": "top",
 "paddingTop": 0,
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "contentOpaque": false,
 "shadow": false,
 "data": {
  "name": "--- MENU"
 },
 "layout": "absolute"
},
{
 "fontFamily": "Arial",
 "fontColor": "#333333",
 "data": {
  "name": "DropDown1204"
 },
 "id": "DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8",
 "left": 30,
 "class": "DropDown",
 "rollOverPopUpBackgroundColor": "#CCCCCC",
 "arrowBeforeLabel": false,
 "borderSize": 0,
 "backgroundOpacity": 0.72,
 "playList": "this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist",
 "popUpShadowColor": "#000000",
 "width": "11.212%",
 "popUpBorderRadius": 0,
 "minHeight": 20,
 "borderRadius": 4,
 "popUpGap": 0,
 "popUpBackgroundColor": "#FFFFFF",
 "paddingRight": 5,
 "backgroundColorRatios": [
  0
 ],
 "selectedPopUpBackgroundColor": "#33CCFF",
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF"
 ],
 "top": 40,
 "minWidth": 200,
 "popUpBackgroundOpacity": 0.72,
 "height": "3.618%",
 "popUpShadow": false,
 "gap": 0,
 "fontSize": 14,
 "paddingBottom": 0,
 "fontStyle": "normal",
 "paddingTop": 0,
 "popUpFontColor": "#000000",
 "popUpShadowBlurRadius": 6,
 "arrowColor": "#8A8A8A",
 "paddingLeft": 5,
 "backgroundColorDirection": "vertical",
 "shadow": false,
 "fontWeight": "normal",
 "textDecoration": "none",
 "popUpShadowSpread": 1,
 "popUpShadowOpacity": 0
},
{
 "pressedRollOverIconURL": "skin/IconButton_5A0D14CF_5772_E32E_4158_F5607133AB8C_pressed_rollover.png",
 "maxWidth": 58,
 "id": "IconButton_5A0D14CF_5772_E32E_4158_F5607133AB8C",
 "maxHeight": 58,
 "width": 58,
 "class": "IconButton",
 "borderSize": 0,
 "backgroundOpacity": 0,
 "horizontalAlign": "center",
 "minHeight": 1,
 "borderRadius": 0,
 "paddingRight": 0,
 "transparencyActive": true,
 "propagateClick": true,
 "verticalAlign": "middle",
 "height": 58,
 "minWidth": 1,
 "pressedIconURL": "skin/IconButton_5A0D14CF_5772_E32E_4158_F5607133AB8C_pressed.png",
 "mode": "toggle",
 "paddingBottom": 0,
 "paddingTop": 0,
 "iconURL": "skin/IconButton_5A0D14CF_5772_E32E_4158_F5607133AB8C.png",
 "paddingLeft": 0,
 "cursor": "hand",
 "shadow": false,
 "data": {
  "name": "IconButton FULLSCREEN"
 }
},
{
 "pressedRollOverIconURL": "skin/IconButton_5A0D34CF_5772_E32E_41C5_75E2393767BE_pressed_rollover.png",
 "maxWidth": 58,
 "id": "IconButton_5A0D34CF_5772_E32E_41C5_75E2393767BE",
 "maxHeight": 58,
 "width": 58,
 "class": "IconButton",
 "borderSize": 0,
 "backgroundOpacity": 0,
 "horizontalAlign": "center",
 "minHeight": 1,
 "borderRadius": 0,
 "paddingRight": 0,
 "transparencyActive": true,
 "propagateClick": true,
 "verticalAlign": "middle",
 "height": 58,
 "minWidth": 1,
 "pressedIconURL": "skin/IconButton_5A0D34CF_5772_E32E_41C5_75E2393767BE_pressed.png",
 "mode": "toggle",
 "paddingBottom": 0,
 "paddingTop": 0,
 "iconURL": "skin/IconButton_5A0D34CF_5772_E32E_41C5_75E2393767BE.png",
 "paddingLeft": 0,
 "cursor": "hand",
 "shadow": false,
 "data": {
  "name": "IconButton MUTE"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C, this.camera_D1D08BF8_C6C8_3160_41E1_42CC1955718C); this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.79,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 144.34,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -3.05
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.79,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_DC697415_C648_36A0_41E4_EEBA69887969",
   "pitch": -3.05,
   "yaw": 144.34,
   "distance": 100
  }
 ],
 "id": "overlay_D4DC880E_C648_3EA0_41E5_7681453BB95E",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C, this.camera_D1DACBE9_C6C8_3160_41D0_079FF422F0BB); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -123.46,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.46
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_DC699415_C648_36A0_41E3_E3AE025D13B6",
   "pitch": 0.46,
   "yaw": -123.46,
   "distance": 100
  }
 ],
 "id": "overlay_D3913796_C648_F1A0_41DE_57F3C742BCAA",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3, this.camera_D1201D26_C6C8_36E0_41A0_1A7FF6B30609); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 53.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -0.2
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_DC6AA415_C648_36A0_41B3_7CAB491BFFB9",
   "pitch": -0.2,
   "yaw": 53.35,
   "distance": 100
  }
 ],
 "id": "overlay_D566BD25_C648_16E0_41DA_7B5329E8F533",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA, this.camera_D1341D66_C6C8_3160_41E4_EB6F1340AB1D); this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -125.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -0.04
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_DC6AC415_C648_36A0_41E2_26414C3902A5",
   "pitch": -0.04,
   "yaw": -125.47,
   "distance": 100
  }
 ],
 "id": "overlay_D2F5D202_C658_72A0_41E6_943C7F248E3A",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Swiming Pool",
   "click": "this.startPanoramaWithCamera(this.panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03, this.camera_D1A58B7A_C6C8_3160_41CD_EE0465BB05F5); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 133.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 2.22
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_DC760415_C648_36A0_41BF_A7B5631ADD72",
   "pitch": 2.22,
   "yaw": 133.8,
   "distance": 100
  }
 ],
 "id": "overlay_C9196D8F_C658_11A0_41AF_17CE6B9C167C",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Tree House",
   "click": "this.startPanoramaWithCamera(this.panorama_CB286B53_C648_12A0_41CE_C15E45AC9836, this.camera_D1BD3B89_C6C8_31A0_41E2_BE9B0417C214); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -107.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.28
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_DC767415_C648_36A0_41E6_5331B51055DB",
   "pitch": 0.28,
   "yaw": -107.08,
   "distance": 100
  }
 ],
 "id": "overlay_C8A72E70_C658_3360_41D7_91663109CC70",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Swimming Pool",
   "click": "this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.79,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -58.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -3.56
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.79,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_DC75D415_C648_36A0_41E6_288F4E8ED0C6",
   "pitch": -3.56,
   "yaw": -58.65,
   "distance": 100
  }
 ],
 "id": "overlay_D737E693_C648_73A0_41DD_FBE8F38DA3C2",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Party Lawn",
   "click": "this.startPanoramaWithCamera(this.panorama_CB5546BC_C648_33E0_41E6_9A599596894C, this.camera_D1CCCBBA_C6C8_31E0_41E1_142E73626E13); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 58.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -0.54
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_DC746415_C648_36A0_41C0_416821C16218",
   "pitch": -0.54,
   "yaw": 58.92,
   "distance": 100
  }
 ],
 "id": "overlay_D42BD371_C678_1160_41A6_0D1EDDF8E6C5",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C, this.camera_D1C52BC9_C6C8_31A0_41DB_6C9F9E22A87E); this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -4.63,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -2.3
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_DC68E415_C648_36A0_41D2_3C28B7A8610B",
   "pitch": -2.3,
   "yaw": -4.63,
   "distance": 100
  }
 ],
 "id": "overlay_D53DFF54_C648_32A0_41E5_5EA08476668E",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F, this.camera_D1F5DC48_C6C8_36A0_41CC_F50CC6FD3A5E); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.79,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -175.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -2.8
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.79,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_DC683415_C648_36A0_41E8_B8ABA1B87976",
   "pitch": -2.8,
   "yaw": -175.72,
   "distance": 100
  }
 ],
 "id": "overlay_D57BA8C6_C648_FFA0_41D8_8318277867E7",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3, this.camera_D106EC87_C6C8_37A0_41E4_2A3944947EDD); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.79,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -70.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -2.8
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.79,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_DC684415_C648_36A0_41E6_FB528D5FFEC9",
   "pitch": -2.8,
   "yaw": -70.71,
   "distance": 100
  }
 ],
 "id": "overlay_D25DBA7A_C648_7360_41CC_915449C35C0D",
 "rollOverDisplay": false
},
{
 "maxWidth": 58,
 "id": "IconButton_5A0D54CF_5772_E32E_41CC_563BC5A99C44",
 "maxHeight": 58,
 "width": 58,
 "class": "IconButton",
 "borderSize": 0,
 "backgroundOpacity": 0,
 "horizontalAlign": "center",
 "minHeight": 1,
 "borderRadius": 0,
 "paddingRight": 0,
 "transparencyActive": true,
 "propagateClick": true,
 "verticalAlign": "middle",
 "height": 58,
 "rollOverIconURL": "skin/IconButton_5A0D54CF_5772_E32E_41CC_563BC5A99C44_rollover.png",
 "minWidth": 1,
 "mode": "push",
 "paddingBottom": 0,
 "paddingTop": 0,
 "iconURL": "skin/IconButton_5A0D54CF_5772_E32E_41CC_563BC5A99C44.png",
 "paddingLeft": 0,
 "cursor": "hand",
 "shadow": false,
 "data": {
  "name": "IconButton VR"
 }
},
{
 "maxWidth": 49,
 "id": "IconButton_46D29939_57B6_2572_4181_A29735EA1C2F",
 "maxHeight": 37,
 "width": 49,
 "class": "IconButton",
 "right": 30,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "horizontalAlign": "center",
 "minHeight": 1,
 "borderRadius": 0,
 "paddingRight": 0,
 "transparencyActive": true,
 "propagateClick": true,
 "verticalAlign": "middle",
 "height": 37,
 "rollOverIconURL": "skin/IconButton_46D29939_57B6_2572_4181_A29735EA1C2F_rollover.png",
 "minWidth": 1,
 "bottom": 8,
 "paddingBottom": 0,
 "mode": "push",
 "paddingTop": 0,
 "iconURL": "skin/IconButton_46D29939_57B6_2572_4181_A29735EA1C2F.png",
 "paddingLeft": 0,
 "cursor": "hand",
 "shadow": false,
 "data": {
  "name": "IconButton VR"
 }
},
{
 "pressedRollOverIconURL": "skin/IconButton_5A0D04CF_5772_E32E_41BB_81FF7DA1667F_pressed_rollover.png",
 "maxWidth": 58,
 "id": "IconButton_5A0D04CF_5772_E32E_41BB_81FF7DA1667F",
 "maxHeight": 58,
 "width": 58,
 "class": "IconButton",
 "borderSize": 0,
 "backgroundOpacity": 0,
 "horizontalAlign": "center",
 "minHeight": 1,
 "borderRadius": 0,
 "paddingRight": 0,
 "transparencyActive": true,
 "propagateClick": true,
 "verticalAlign": "middle",
 "height": 58,
 "minWidth": 1,
 "pressedIconURL": "skin/IconButton_5A0D04CF_5772_E32E_41BB_81FF7DA1667F_pressed.png",
 "mode": "toggle",
 "paddingBottom": 0,
 "paddingTop": 0,
 "iconURL": "skin/IconButton_5A0D04CF_5772_E32E_41BB_81FF7DA1667F.png",
 "paddingLeft": 0,
 "cursor": "hand",
 "shadow": false,
 "data": {
  "name": "IconButton HS "
 }
},
{
 "pressedRollOverIconURL": "skin/IconButton_5A0D24CF_5772_E32E_41D2_D193D2C1028D_pressed_rollover.png",
 "maxWidth": 58,
 "id": "IconButton_5A0D24CF_5772_E32E_41D2_D193D2C1028D",
 "maxHeight": 58,
 "width": 58,
 "class": "IconButton",
 "borderSize": 0,
 "backgroundOpacity": 0,
 "horizontalAlign": "center",
 "minHeight": 1,
 "borderRadius": 0,
 "paddingRight": 0,
 "transparencyActive": true,
 "propagateClick": true,
 "verticalAlign": "middle",
 "height": 58,
 "minWidth": 1,
 "mode": "toggle",
 "pressedIconURL": "skin/IconButton_5A0D24CF_5772_E32E_41D2_D193D2C1028D_pressed.png",
 "paddingBottom": 0,
 "paddingTop": 0,
 "iconURL": "skin/IconButton_5A0D24CF_5772_E32E_41D2_D193D2C1028D.png",
 "paddingLeft": 0,
 "cursor": "hand",
 "shadow": false,
 "data": {
  "name": "IconButton GYRO"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Kids Pool",
   "click": "this.startPanoramaWithCamera(this.panorama_CB57721D_C648_72A0_41E3_FAC6439D7805, this.camera_D1E8DC18_C6C8_36A0_41E6_43A50D88418F); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -86.53,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -0.04
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_DC769415_C648_36A0_41B6_A1276A0E3F75",
   "pitch": -0.04,
   "yaw": -86.53,
   "distance": 100
  }
 ],
 "id": "overlay_C980AAD4_C658_F3A0_41B9_D335A00014D9",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9, this.camera_D1FEDC29_C6C8_36E0_41E8_668A33BE5E95); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 157.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 1.22
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_DC752415_C648_36A0_41C3_5835385D58BD",
   "pitch": 1.22,
   "yaw": 157.91,
   "distance": 100
  }
 ],
 "id": "overlay_D3AAF2E8_C658_1360_41BC_F73E95F14A08",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Swimming Pool",
   "click": "this.startPanoramaWithCamera(this.panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03, this.camera_D1B7EB99_C6C8_31A0_41D8_7CE510941A33); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.79,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 166.2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -3.3
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.79,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_DC754415_C648_36A0_41D1_3330645A19EA",
   "pitch": -3.3,
   "yaw": 166.2,
   "distance": 100
  }
 ],
 "id": "overlay_D6AA6DD5_C648_71A0_41DA_F45F8F8D5CD9",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Amphitheatre",
   "click": "this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -105.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -0.29
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_DF52436B_C6C8_3160_41A9_E2D8FA86597D",
   "pitch": -0.29,
   "yaw": -105.26,
   "distance": 100
  }
 ],
 "id": "overlay_D665BC0C_C648_F6A0_41DE_331CD3F5972B",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Children Play Area",
   "click": "this.startPanoramaWithCamera(this.panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9, this.camera_D1472D97_C6C8_31A0_41D5_EF14D5C20777); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -45.18,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -2.16
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_DC709415_C648_36A0_41D5_C37236551576",
   "pitch": -2.16,
   "yaw": -45.18,
   "distance": 100
  }
 ],
 "id": "overlay_C994B4EE_C648_3760_41E6_517AAD9B63F0",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Tennis Court",
   "click": "this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 111.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -0.64
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_D03F86D4_C6C8_13A0_41E5_393FA8979039",
   "pitch": -0.64,
   "yaw": 111.33,
   "distance": 100
  }
 ],
 "id": "overlay_D1F2775B_C6B8_32A0_41D0_E538B6AC53CC",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Party Lawn",
   "click": "this.startPanoramaWithCamera(this.panorama_CB5546BC_C648_33E0_41E6_9A599596894C, this.camera_D17CDE34_C6C8_32E0_41DF_D11842B65203); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.79,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -103.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 3.48
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.79,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_DC6B4415_C648_36A0_41E3_2AD1B2BCB4E3",
   "pitch": 3.48,
   "yaw": -103.87,
   "distance": 100
  }
 ],
 "id": "overlay_D429EB9C_C679_F1A0_41DE_FA83845518BB",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Basketball Court",
   "click": "this.startPanoramaWithCamera(this.panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA, this.camera_DE8FCE75_C6C8_3360_41C5_67905BF160A3); this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 133.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 2.22
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_DC6B8415_C648_36A0_41C1_35E57E3E0E45",
   "pitch": 2.22,
   "yaw": 133.8,
   "distance": 100
  }
 ],
 "id": "overlay_D3D00797_C658_31A0_41DD_47DB9BB0B6D3",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Fruit Tree Orchard",
   "click": "this.startPanoramaWithCamera(this.panorama_CB5D789E_C648_1FA0_41DF_496B2603085E, this.camera_D1585DD0_C6C8_31A1_41E8_2A65A4DAB121); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 168.46,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -0.04
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_DC748415_C648_36A0_41C7_EE69DCA7050C",
   "pitch": -0.04,
   "yaw": 168.46,
   "distance": 100
  }
 ],
 "id": "overlay_D75FF815_C67F_FEA0_41B4_848B0814519C",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Amphitheatre",
   "click": "this.startPanoramaWithCamera(this.panorama_CB503455_C648_16A0_41CF_FF7584B17D37, this.camera_D16B8E06_C6C8_32A0_41DD_737CEDD004DD); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.79,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -120.2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -3.56
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.79,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_DC74F415_C648_36A0_41B4_6595CB086F44",
   "pitch": -3.56,
   "yaw": -120.2,
   "distance": 100
  }
 ],
 "id": "overlay_D05F5FCF_C658_31A0_41E6_482134EEA526",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Tennis Court",
   "click": "this.startPanoramaWithCamera(this.panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C, this.camera_D11ABCC7_C6C8_37A0_419E_4E36479B162D); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -91.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 1.22
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_DC6BC415_C648_36A0_41E1_DE9593258637",
   "pitch": 1.22,
   "yaw": -91.81,
   "distance": 100
  }
 ],
 "id": "overlay_D4364F5F_C678_F2A0_41B6_1A9DCC7E42E8",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Fruit Tree Orchard",
   "click": "this.startPanoramaWithCamera(this.panorama_CB5D789E_C648_1FA0_41DF_496B2603085E, this.camera_D12F0CF6_C6C8_3760_41C0_06999620AF31); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -40.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 1.22
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_DC6A6415_C648_36A0_41C3_5FD764AC2CF0",
   "pitch": 1.22,
   "yaw": -40.81,
   "distance": 100
  }
 ],
 "id": "overlay_D38EFB1B_C658_12A0_41D2_B522C073959F",
 "rollOverDisplay": false
},
{
 "children": [
  "this.IconButton_5A0D74CF_5772_E32E_41CA_B71D343F60D3"
 ],
 "id": "Container_5A0D64CF_5772_E32E_41D0_3F190463451B",
 "width": 110,
 "class": "Container",
 "borderSize": 0,
 "right": "0%",
 "backgroundOpacity": 0,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "borderRadius": 0,
 "overflow": "visible",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "propagateClick": true,
 "verticalAlign": "middle",
 "height": 110,
 "top": "0%",
 "minWidth": 1,
 "horizontalAlign": "center",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "scrollBarMargin": 2,
 "paddingBottom": 0,
 "paddingTop": 0,
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "contentOpaque": false,
 "shadow": false,
 "data": {
  "name": "button menu sup"
 },
 "layout": "horizontal"
},
{
 "children": [
  "this.IconButton_5A0D54CF_5772_E32E_41CC_563BC5A99C44",
  "this.IconButton_5A0D24CF_5772_E32E_41D2_D193D2C1028D",
  "this.IconButton_5A0D34CF_5772_E32E_41C5_75E2393767BE",
  "this.IconButton_5A0D04CF_5772_E32E_41BB_81FF7DA1667F",
  "this.IconButton_5A0D14CF_5772_E32E_4158_F5607133AB8C",
  "this.IconButton_5A0DE4CF_5772_E32E_41B2_E8D74E2067B2",
  "this.IconButton_5A0DF4CF_5772_E32E_41CE_2196B58CC419"
 ],
 "id": "Container_5A0D44CF_5772_E32E_41D0_19B23A64B7F8",
 "width": "91.304%",
 "class": "Container",
 "right": "0%",
 "borderSize": 0,
 "backgroundOpacity": 0,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "borderRadius": 0,
 "overflow": "scroll",
 "paddingRight": 0,
 "propagateClick": true,
 "height": "85.959%",
 "minWidth": 1,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "center",
 "bottom": "0%",
 "scrollBarOpacity": 0.5,
 "gap": 3,
 "scrollBarMargin": 2,
 "paddingBottom": 0,
 "verticalAlign": "top",
 "paddingTop": 0,
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "visible": false,
 "contentOpaque": false,
 "shadow": false,
 "data": {
  "name": "-button set"
 },
 "layout": "vertical"
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC697415_C648_36A0_41E4_EEBA69887969",
 "levels": [
  {
   "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC699415_C648_36A0_41E3_E3AE025D13B6",
 "levels": [
  {
   "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC6AA415_C648_36A0_41B3_7CAB491BFFB9",
 "levels": [
  {
   "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC6AC415_C648_36A0_41E2_26414C3902A5",
 "levels": [
  {
   "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC760415_C648_36A0_41BF_A7B5631ADD72",
 "levels": [
  {
   "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC767415_C648_36A0_41E6_5331B51055DB",
 "levels": [
  {
   "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC75D415_C648_36A0_41E6_288F4E8ED0C6",
 "levels": [
  {
   "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC746415_C648_36A0_41C0_416821C16218",
 "levels": [
  {
   "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC68E415_C648_36A0_41D2_3C28B7A8610B",
 "levels": [
  {
   "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC683415_C648_36A0_41E8_B8ABA1B87976",
 "levels": [
  {
   "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC684415_C648_36A0_41E6_FB528D5FFEC9",
 "levels": [
  {
   "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC769415_C648_36A0_41B6_A1276A0E3F75",
 "levels": [
  {
   "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC752415_C648_36A0_41C3_5835385D58BD",
 "levels": [
  {
   "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC754415_C648_36A0_41D1_3330645A19EA",
 "levels": [
  {
   "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DF52436B_C6C8_3160_41A9_E2D8FA86597D",
 "levels": [
  {
   "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC709415_C648_36A0_41D5_C37236551576",
 "levels": [
  {
   "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_D03F86D4_C6C8_13A0_41E5_393FA8979039",
 "levels": [
  {
   "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC6B4415_C648_36A0_41E3_2AD1B2BCB4E3",
 "levels": [
  {
   "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC6B8415_C648_36A0_41C1_35E57E3E0E45",
 "levels": [
  {
   "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC748415_C648_36A0_41C7_EE69DCA7050C",
 "levels": [
  {
   "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC74F415_C648_36A0_41B4_6595CB086F44",
 "levels": [
  {
   "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC6BC415_C648_36A0_41E1_DE9593258637",
 "levels": [
  {
   "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC6A6415_C648_36A0_41C3_5FD764AC2CF0",
 "levels": [
  {
   "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "pressedRollOverIconURL": "skin/IconButton_5A0D74CF_5772_E32E_41CA_B71D343F60D3_pressed_rollover.png",
 "maxWidth": 60,
 "id": "IconButton_5A0D74CF_5772_E32E_41CA_B71D343F60D3",
 "maxHeight": 60,
 "width": 60,
 "class": "IconButton",
 "borderSize": 0,
 "backgroundOpacity": 0,
 "horizontalAlign": "center",
 "minHeight": 1,
 "borderRadius": 0,
 "paddingRight": 0,
 "transparencyActive": true,
 "propagateClick": true,
 "verticalAlign": "middle",
 "height": 60,
 "minWidth": 1,
 "pressedIconURL": "skin/IconButton_5A0D74CF_5772_E32E_41CA_B71D343F60D3_pressed.png",
 "mode": "toggle",
 "click": "if(!this.Container_5A0D44CF_5772_E32E_41D0_19B23A64B7F8.get('visible')){ this.setComponentVisibility(this.Container_5A0D44CF_5772_E32E_41D0_19B23A64B7F8, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_5A0D44CF_5772_E32E_41D0_19B23A64B7F8, false, 0, null, null, false) }",
 "paddingBottom": 0,
 "paddingTop": 0,
 "iconURL": "skin/IconButton_5A0D74CF_5772_E32E_41CA_B71D343F60D3.png",
 "paddingLeft": 0,
 "cursor": "hand",
 "shadow": false,
 "data": {
  "name": "image button menu"
 }
},
{
 "maxWidth": 58,
 "id": "IconButton_5A0DE4CF_5772_E32E_41B2_E8D74E2067B2",
 "maxHeight": 58,
 "width": 58,
 "class": "IconButton",
 "borderSize": 0,
 "backgroundOpacity": 0,
 "horizontalAlign": "center",
 "minHeight": 1,
 "borderRadius": 0,
 "paddingRight": 0,
 "transparencyActive": true,
 "propagateClick": true,
 "verticalAlign": "middle",
 "height": 58,
 "rollOverIconURL": "skin/IconButton_5A0DE4CF_5772_E32E_41B2_E8D74E2067B2_rollover.png",
 "minWidth": 1,
 "click": "this.shareTwitter(window.location.href)",
 "mode": "push",
 "paddingBottom": 0,
 "paddingTop": 0,
 "iconURL": "skin/IconButton_5A0DE4CF_5772_E32E_41B2_E8D74E2067B2.png",
 "paddingLeft": 0,
 "cursor": "hand",
 "shadow": false,
 "data": {
  "name": "IconButton TWITTER"
 }
},
{
 "maxWidth": 58,
 "id": "IconButton_5A0DF4CF_5772_E32E_41CE_2196B58CC419",
 "maxHeight": 58,
 "width": 58,
 "class": "IconButton",
 "borderSize": 0,
 "backgroundOpacity": 0,
 "horizontalAlign": "center",
 "minHeight": 1,
 "borderRadius": 0,
 "paddingRight": 0,
 "transparencyActive": true,
 "propagateClick": true,
 "verticalAlign": "middle",
 "height": 58,
 "rollOverIconURL": "skin/IconButton_5A0DF4CF_5772_E32E_41CE_2196B58CC419_rollover.png",
 "minWidth": 1,
 "click": "this.shareFacebook(window.location.href)",
 "mode": "push",
 "paddingBottom": 0,
 "paddingTop": 0,
 "iconURL": "skin/IconButton_5A0DF4CF_5772_E32E_41CE_2196B58CC419.png",
 "paddingLeft": 0,
 "cursor": "hand",
 "shadow": false,
 "data": {
  "name": "IconButton FB"
 }
}],
 "gap": 10,
 "buttonToggleMute": "this.IconButton_5A0D34CF_5772_E32E_41C5_75E2393767BE",
 "scrollBarMargin": 2,
 "paddingBottom": 0,
 "backgroundPreloadEnabled": true,
 "paddingTop": 0,
 "scrollBarWidth": 10,
 "mouseWheelEnabled": true,
 "vrPolyfillScale": 0.5,
 "paddingLeft": 0,
 "mobileMipmappingEnabled": false,
 "contentOpaque": false,
 "shadow": false,
 "data": {
  "name": "Player445"
 },
 "layout": "absolute"
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
