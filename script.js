(function(){
    var script = {
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "id": "rootPlayer",
 "minHeight": 20,
 "children": [
  "this.MainViewer",
  "this.Container_5A0DC4CF_5772_E32E_41CD_F6650DCF6BF2",
  "this.Container_46D2A939_57B6_2572_41BD_BAA93AA47AA5",
  "this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8"
 ],
 "scrollBarVisible": "rollOver",
 "width": "100%",
 "class": "Player",
 "start": "this.playAudioList([this.audio_3474E1DB_05BF_06CA_4181_847828A6CE51]); this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_5A0D24CF_5772_E32E_41D2_D193D2C1028D], 'gyroscopeAvailable'); this.syncPlaylists([this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.IconButton_5A0D14CF_5772_E32E_4158_F5607133AB8C].forEach(function(component) { component.set('visible', false); }) }",
 "minWidth": 20,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "buttonToggleFullscreen": "this.IconButton_5A0D14CF_5772_E32E_4158_F5607133AB8C",
 "scripts": {
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "unregisterKey": function(key){  delete window[key]; },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "existsKey": function(key){  return key in window; },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "getKey": function(key){  return window[key]; },
  "registerKey": function(key, value){  window[key] = value; },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } }
 },
 "downloadEnabled": false,
 "contentOpaque": false,
 "defaultVRPointer": "laser",
 "verticalAlign": "top",
 "layout": "absolute",
 "paddingRight": 0,
 "height": "100%",
 "buttonToggleMute": "this.IconButton_5A0D34CF_5772_E32E_41C5_75E2393767BE",
 "borderRadius": 0,
 "borderSize": 0,
 "definitions": [{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_BCEA59E2_B1BD_1BFB_41BA_CBA168D7A437_camera",
 "automaticZoomSpeed": 10
},
{
 "height": 2500,
 "thumbnailUrl": "media/photo_7672A840_7A52_5B75_41D6_811C88787749_t.jpg",
 "label": "Master Bedroom _Hi res",
 "id": "photo_7672A840_7A52_5B75_41D6_811C88787749",
 "duration": 5000,
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
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 16.82,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_A024C981_B1C1_41C7_41E3_AAE6100C82F6",
 "automaticZoomSpeed": 10
},
{
 "height": 2250,
 "thumbnailUrl": "media/photo_765FF95D_7A52_BD0C_41D4_3173C32E180D_t.jpg",
 "label": "Parents Bedroom_Hi res",
 "id": "photo_765FF95D_7A52_BD0C_41D4_3173C32E180D",
 "duration": 5000,
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
 }
},
{
 "class": "PlayList",
 "items": [
  {
   "media": "this.panorama_BCFFFAD1_B1BF_39D9_41D2_509879A2CEA3",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_BCFFFAD1_B1BF_39D9_41D2_509879A2CEA3_camera"
  },
  {
   "media": "this.panorama_BF53F03C_B1BF_284F_41DD_C352FC8418D0",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_BF53F03C_B1BF_284F_41DD_C352FC8418D0_camera"
  },
  {
   "media": "this.panorama_BFA03C51_B1BD_18D9_41E3_87F47E2C6B08",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_BFA03C51_B1BD_18D9_41E3_87F47E2C6B08_camera"
  },
  {
   "media": "this.panorama_BFAD8E2D_B1BD_3849_41BD_67EB93C125B9",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_BFAD8E2D_B1BD_3849_41BD_67EB93C125B9_camera"
  },
  {
   "media": "this.panorama_BCEA59E2_B1BD_1BFB_41BA_CBA168D7A437",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_BCEA59E2_B1BD_1BFB_41BA_CBA168D7A437_camera"
  },
  {
   "media": "this.panorama_BCD8E0B5_B1BD_E859_41D5_815DEC60F1EA",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_BCD8E0B5_B1BD_E859_41D5_815DEC60F1EA_camera"
  },
  {
   "media": "this.panorama_BCD26511_B1BD_E859_41D5_6990CBF48BF7",
   "end": "this.trigger('tourEnded')",
   "player": "this.MainViewerPanoramaPlayer",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 0)",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCD26511_B1BD_E859_41D5_6990CBF48BF7_camera"
  }
 ],
 "id": "mainPlayList"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 137.4,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_A04E9921_B1C1_4EC6_41C8_3FED24DDAE46",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 35.4,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_A00689D0_B1C1_4146_41CE_DD589597F0B4",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -71.21,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_A03749A0_B1C1_41C5_41C1_4AB7F3A4980D",
 "automaticZoomSpeed": 10
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -163.18,
   "backwardYaw": -85.3,
   "distance": 1,
   "panorama": "this.panorama_BCD8E0B5_B1BD_E859_41D5_815DEC60F1EA"
  }
 ],
 "label": "Kids pool",
 "id": "panorama_BCD26511_B1BD_E859_41D5_6990CBF48BF7",
 "class": "Panorama",
 "hfov": 360,
 "vfov": 180,
 "overlays": [
  "this.overlay_BFA94605_B1C6_C2CF_41D7_43B8749BFBBC"
 ],
 "partial": false,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCD26511_B1BD_E859_41D5_6990CBF48BF7_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCD26511_B1BD_E859_41D5_6990CBF48BF7_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCD26511_B1BD_E859_41D5_6990CBF48BF7_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCD26511_B1BD_E859_41D5_6990CBF48BF7_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BCD26511_B1BD_E859_41D5_6990CBF48BF7_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCD26511_B1BD_E859_41D5_6990CBF48BF7_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCD26511_B1BD_E859_41D5_6990CBF48BF7_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCD26511_B1BD_E859_41D5_6990CBF48BF7_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCD26511_B1BD_E859_41D5_6990CBF48BF7_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCD26511_B1BD_E859_41D5_6990CBF48BF7_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCD26511_B1BD_E859_41D5_6990CBF48BF7_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCD26511_B1BD_E859_41D5_6990CBF48BF7_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCD26511_B1BD_E859_41D5_6990CBF48BF7_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "pitch": 0,
 "thumbnailUrl": "media/panorama_BCD26511_B1BD_E859_41D5_6990CBF48BF7_t.jpg"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_BFA03C51_B1BD_18D9_41E3_87F47E2C6B08_camera",
 "automaticZoomSpeed": 10
},
{
 "height": 3334,
 "thumbnailUrl": "media/photo_767255C6_7A52_557C_41DD_51216B6F3598_t.jpg",
 "label": "Kitchen_Hi res",
 "id": "photo_767255C6_7A52_557C_41DD_51216B6F3598",
 "duration": 5000,
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
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_BCD26511_B1BD_E859_41D5_6990CBF48BF7_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_BF53F03C_B1BF_284F_41DD_C352FC8418D0_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_BCFFFAD1_B1BF_39D9_41D2_509879A2CEA3_camera",
 "automaticZoomSpeed": 10
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -85.3,
   "backwardYaw": -163.18,
   "distance": 1,
   "panorama": "this.panorama_BCD26511_B1BD_E859_41D5_6990CBF48BF7"
  }
 ],
 "label": "Swimming pool",
 "id": "panorama_BCD8E0B5_B1BD_E859_41D5_815DEC60F1EA",
 "class": "Panorama",
 "hfov": 360,
 "vfov": 180,
 "overlays": [
  "this.overlay_BC387D9C_B1C1_41FD_41E0_60326CCB947D"
 ],
 "partial": false,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCD8E0B5_B1BD_E859_41D5_815DEC60F1EA_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCD8E0B5_B1BD_E859_41D5_815DEC60F1EA_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCD8E0B5_B1BD_E859_41D5_815DEC60F1EA_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCD8E0B5_B1BD_E859_41D5_815DEC60F1EA_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BCD8E0B5_B1BD_E859_41D5_815DEC60F1EA_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCD8E0B5_B1BD_E859_41D5_815DEC60F1EA_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCD8E0B5_B1BD_E859_41D5_815DEC60F1EA_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCD8E0B5_B1BD_E859_41D5_815DEC60F1EA_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCD8E0B5_B1BD_E859_41D5_815DEC60F1EA_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCD8E0B5_B1BD_E859_41D5_815DEC60F1EA_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCD8E0B5_B1BD_E859_41D5_815DEC60F1EA_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCD8E0B5_B1BD_E859_41D5_815DEC60F1EA_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCD8E0B5_B1BD_E859_41D5_815DEC60F1EA_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "pitch": 0,
 "thumbnailUrl": "media/panorama_BCD8E0B5_B1BD_E859_41D5_815DEC60F1EA_t.jpg"
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 108.79,
   "backwardYaw": -42.6,
   "distance": 1,
   "panorama": "this.panorama_BCFFFAD1_B1BF_39D9_41D2_509879A2CEA3"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -144.6,
   "backwardYaw": -70.48,
   "distance": 1,
   "panorama": "this.panorama_BFA03C51_B1BD_18D9_41E3_87F47E2C6B08"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCEA59E2_B1BD_1BFB_41BA_CBA168D7A437"
  }
 ],
 "label": "TreeHouseKids",
 "id": "panorama_BF53F03C_B1BF_284F_41DD_C352FC8418D0",
 "class": "Panorama",
 "hfov": 360,
 "vfov": 180,
 "overlays": [
  "this.overlay_BF53E03C_B1BF_284F_41CE_D9D7A47EB05D",
  "this.overlay_BF53D03C_B1BF_284F_41D2_34FFDB005516",
  "this.overlay_BF05CE60_B1C1_4345_41D9_A623A4E87C92"
 ],
 "partial": false,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BF53F03C_B1BF_284F_41DD_C352FC8418D0_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BF53F03C_B1BF_284F_41DD_C352FC8418D0_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BF53F03C_B1BF_284F_41DD_C352FC8418D0_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BF53F03C_B1BF_284F_41DD_C352FC8418D0_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BF53F03C_B1BF_284F_41DD_C352FC8418D0_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BF53F03C_B1BF_284F_41DD_C352FC8418D0_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BF53F03C_B1BF_284F_41DD_C352FC8418D0_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BF53F03C_B1BF_284F_41DD_C352FC8418D0_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BF53F03C_B1BF_284F_41DD_C352FC8418D0_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BF53F03C_B1BF_284F_41DD_C352FC8418D0_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BF53F03C_B1BF_284F_41DD_C352FC8418D0_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BF53F03C_B1BF_284F_41DD_C352FC8418D0_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BF53F03C_B1BF_284F_41DD_C352FC8418D0_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "pitch": 0,
 "thumbnailUrl": "media/panorama_BF53F03C_B1BF_284F_41DD_C352FC8418D0_t.jpg"
},
{
 "gyroscopeEnabled": true,
 "buttonCardboardView": [
  "this.IconButton_5A0D54CF_5772_E32E_41CC_563BC5A99C44",
  "this.IconButton_46D29939_57B6_2572_4181_A29735EA1C2F"
 ],
 "class": "PanoramaPlayer",
 "id": "MainViewerPanoramaPlayer",
 "viewerArea": "this.MainViewer",
 "buttonToggleHotspots": "this.IconButton_5A0D04CF_5772_E32E_41BB_81FF7DA1667F",
 "touchControlMode": "drag_rotation",
 "gyroscopeVerticalDraggingEnabled": true,
 "mouseControlMode": "drag_acceleration",
 "displayPlaybackBar": true,
 "buttonToggleGyroscope": "this.IconButton_5A0D24CF_5772_E32E_41D2_D193D2C1028D"
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -42.6,
   "backwardYaw": 108.79,
   "distance": 1,
   "panorama": "this.panorama_BF53F03C_B1BF_284F_41DD_C352FC8418D0"
  }
 ],
 "label": "TennisCourt",
 "id": "panorama_BCFFFAD1_B1BF_39D9_41D2_509879A2CEA3",
 "class": "Panorama",
 "hfov": 360,
 "vfov": 180,
 "overlays": [
  "this.overlay_BCFC6AD1_B1BF_39D9_41D8_76DCCED9DE03"
 ],
 "partial": false,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFFFAD1_B1BF_39D9_41D2_509879A2CEA3_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFFFAD1_B1BF_39D9_41D2_509879A2CEA3_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFFFAD1_B1BF_39D9_41D2_509879A2CEA3_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFFFAD1_B1BF_39D9_41D2_509879A2CEA3_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BCFFFAD1_B1BF_39D9_41D2_509879A2CEA3_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFFFAD1_B1BF_39D9_41D2_509879A2CEA3_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFFFAD1_B1BF_39D9_41D2_509879A2CEA3_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFFFAD1_B1BF_39D9_41D2_509879A2CEA3_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFFFAD1_B1BF_39D9_41D2_509879A2CEA3_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFFFAD1_B1BF_39D9_41D2_509879A2CEA3_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFFFAD1_B1BF_39D9_41D2_509879A2CEA3_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFFFAD1_B1BF_39D9_41D2_509879A2CEA3_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFFFAD1_B1BF_39D9_41D2_509879A2CEA3_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "pitch": 0,
 "thumbnailUrl": "media/panorama_BCFFFAD1_B1BF_39D9_41D2_509879A2CEA3_t.jpg"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 94.7,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_A01179FF_B1C1_413A_41D9_D9F8DACAEB4D",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_BFAD8E2D_B1BD_3849_41BD_67EB93C125B9_camera",
 "automaticZoomSpeed": 10
},
{
 "height": 2500,
 "thumbnailUrl": "media/photo_765DDD36_7A52_D51C_41D4_71F91FECEBAB_t.jpg",
 "label": "Kids_Hi res",
 "id": "photo_765DDD36_7A52_D51C_41D4_71F91FECEBAB",
 "duration": 5000,
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
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 109.52,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_A05AE950_B1C1_4145_4194_43E2AF29BEBE",
 "automaticZoomSpeed": 10
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BFAD8E2D_B1BD_3849_41BD_67EB93C125B9"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -70.48,
   "backwardYaw": -144.6,
   "distance": 1,
   "panorama": "this.panorama_BF53F03C_B1BF_284F_41DD_C352FC8418D0"
  }
 ],
 "label": "JungleArea",
 "id": "panorama_BFA03C51_B1BD_18D9_41E3_87F47E2C6B08",
 "class": "Panorama",
 "hfov": 360,
 "vfov": 180,
 "overlays": [
  "this.overlay_BFA02C51_B1BD_18D9_41E0_23AA3D06BE02",
  "this.overlay_BCAC58E8_B1BF_CF46_41E4_5F64D139A388"
 ],
 "partial": false,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BFA03C51_B1BD_18D9_41E3_87F47E2C6B08_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BFA03C51_B1BD_18D9_41E3_87F47E2C6B08_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BFA03C51_B1BD_18D9_41E3_87F47E2C6B08_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BFA03C51_B1BD_18D9_41E3_87F47E2C6B08_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BFA03C51_B1BD_18D9_41E3_87F47E2C6B08_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BFA03C51_B1BD_18D9_41E3_87F47E2C6B08_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BFA03C51_B1BD_18D9_41E3_87F47E2C6B08_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BFA03C51_B1BD_18D9_41E3_87F47E2C6B08_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BFA03C51_B1BD_18D9_41E3_87F47E2C6B08_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BFA03C51_B1BD_18D9_41E3_87F47E2C6B08_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BFA03C51_B1BD_18D9_41E3_87F47E2C6B08_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BFA03C51_B1BD_18D9_41E3_87F47E2C6B08_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BFA03C51_B1BD_18D9_41E3_87F47E2C6B08_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "pitch": 0,
 "thumbnailUrl": "media/panorama_BFA03C51_B1BD_18D9_41E3_87F47E2C6B08_t.jpg"
},
{
 "audio": {
  "class": "AudioResource",
  "mp3Url": "media/audio_3474E1DB_05BF_06CA_4181_847828A6CE51.mp3",
  "oggUrl": "media/audio_3474E1DB_05BF_06CA_4181_847828A6CE51.ogg"
 },
 "autoplay": true,
 "class": "MediaAudio",
 "id": "audio_3474E1DB_05BF_06CA_4181_847828A6CE51",
 "data": {
  "label": "Romantic"
 }
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BFAD8E2D_B1BD_3849_41BD_67EB93C125B9"
  }
 ],
 "label": "Basketball Court",
 "id": "panorama_BCEA59E2_B1BD_1BFB_41BA_CBA168D7A437",
 "class": "Panorama",
 "hfov": 360,
 "vfov": 180,
 "overlays": [
  "this.overlay_BFBBFE8E_B1CE_C3DD_41D5_FAA5BDD199E0"
 ],
 "partial": false,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEA59E2_B1BD_1BFB_41BA_CBA168D7A437_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCEA59E2_B1BD_1BFB_41BA_CBA168D7A437_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEA59E2_B1BD_1BFB_41BA_CBA168D7A437_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCEA59E2_B1BD_1BFB_41BA_CBA168D7A437_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BCEA59E2_B1BD_1BFB_41BA_CBA168D7A437_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEA59E2_B1BD_1BFB_41BA_CBA168D7A437_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCEA59E2_B1BD_1BFB_41BA_CBA168D7A437_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEA59E2_B1BD_1BFB_41BA_CBA168D7A437_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCEA59E2_B1BD_1BFB_41BA_CBA168D7A437_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEA59E2_B1BD_1BFB_41BA_CBA168D7A437_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCEA59E2_B1BD_1BFB_41BA_CBA168D7A437_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEA59E2_B1BD_1BFB_41BA_CBA168D7A437_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCEA59E2_B1BD_1BFB_41BA_CBA168D7A437_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "pitch": 0,
 "thumbnailUrl": "media/panorama_BCEA59E2_B1BD_1BFB_41BA_CBA168D7A437_t.jpg"
},
{
 "height": 2250,
 "thumbnailUrl": "media/photo_769C2E67_7A53_D73C_41AF_9CA58A04F3AE_t.jpg",
 "label": "Living _Hi res 2",
 "id": "photo_769C2E67_7A53_D73C_41AF_9CA58A04F3AE",
 "duration": 5000,
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
 }
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCD8E0B5_B1BD_E859_41D5_815DEC60F1EA"
  }
 ],
 "label": "Amphi cam",
 "id": "panorama_BFAD8E2D_B1BD_3849_41BD_67EB93C125B9",
 "class": "Panorama",
 "hfov": 360,
 "vfov": 180,
 "overlays": [
  "this.overlay_BD15F850_B1C3_4F45_41E1_828C900FF787"
 ],
 "partial": false,
 "hfovMin": "150%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BFAD8E2D_B1BD_3849_41BD_67EB93C125B9_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BFAD8E2D_B1BD_3849_41BD_67EB93C125B9_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BFAD8E2D_B1BD_3849_41BD_67EB93C125B9_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BFAD8E2D_B1BD_3849_41BD_67EB93C125B9_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BFAD8E2D_B1BD_3849_41BD_67EB93C125B9_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BFAD8E2D_B1BD_3849_41BD_67EB93C125B9_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BFAD8E2D_B1BD_3849_41BD_67EB93C125B9_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BFAD8E2D_B1BD_3849_41BD_67EB93C125B9_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BFAD8E2D_B1BD_3849_41BD_67EB93C125B9_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BFAD8E2D_B1BD_3849_41BD_67EB93C125B9_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BFAD8E2D_B1BD_3849_41BD_67EB93C125B9_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BFAD8E2D_B1BD_3849_41BD_67EB93C125B9_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BFAD8E2D_B1BD_3849_41BD_67EB93C125B9_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "pitch": 0,
 "thumbnailUrl": "media/panorama_BFAD8E2D_B1BD_3849_41BD_67EB93C125B9_t.jpg"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_BCD8E0B5_B1BD_E859_41D5_815DEC60F1EA_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PlayList",
 "items": [
  {
   "media": "this.panorama_BCFFFAD1_B1BF_39D9_41D2_509879A2CEA3",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 0, 1)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_BCFFFAD1_B1BF_39D9_41D2_509879A2CEA3_camera"
  },
  {
   "media": "this.panorama_BF53F03C_B1BF_284F_41DD_C352FC8418D0",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 1, 2)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_BF53F03C_B1BF_284F_41DD_C352FC8418D0_camera"
  },
  {
   "media": "this.panorama_BFA03C51_B1BD_18D9_41E3_87F47E2C6B08",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 2, 3)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_BFA03C51_B1BD_18D9_41E3_87F47E2C6B08_camera"
  },
  {
   "media": "this.panorama_BFAD8E2D_B1BD_3849_41BD_67EB93C125B9",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 3, 4)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_BFAD8E2D_B1BD_3849_41BD_67EB93C125B9_camera"
  },
  {
   "media": "this.panorama_BCEA59E2_B1BD_1BFB_41BA_CBA168D7A437",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 4, 5)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_BCEA59E2_B1BD_1BFB_41BA_CBA168D7A437_camera"
  },
  {
   "media": "this.panorama_BCD8E0B5_B1BD_E859_41D5_815DEC60F1EA",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 5, 6)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_BCD8E0B5_B1BD_E859_41D5_815DEC60F1EA_camera"
  },
  {
   "media": "this.panorama_BCD26511_B1BD_E859_41D5_6990CBF48BF7",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 6, 0)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_BCD26511_B1BD_E859_41D5_6990CBF48BF7_camera"
  }
 ],
 "id": "DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist"
},
{
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipFontSize": "1.11vmin",
 "paddingLeft": 0,
 "id": "MainViewer",
 "minHeight": 50,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipOpacity": 1,
 "playbackBarHeadWidth": 6,
 "left": 0,
 "playbackBarRight": 0,
 "width": "100%",
 "toolTipTextShadowColor": "#000000",
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipShadowBlurRadius": 3,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "minWidth": 100,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "progressBarBorderRadius": 0,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionDuration": 500,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "paddingRight": 0,
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "height": "100%",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipShadowOpacity": 1,
 "borderSize": 0,
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "toolTipShadowHorizontalLength": 0,
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "progressBottom": 0,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "toolTipBackgroundColor": "#F6F6F6",
 "class": "ViewerArea",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "toolTipFontColor": "#606060",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionMode": "blending",
 "displayTooltipInTouchScreens": true,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "top": 0,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "shadow": false,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "progressBarBorderColor": "#000000",
 "playbackBarHeadOpacity": 1,
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#000000",
 "playbackBarBottom": 5,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "paddingBottom": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "data": {
  "name": "Main Viewer"
 },
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_5A0DC4CF_5772_E32E_41CD_F6650DCF6BF2",
 "minHeight": 1,
 "width": 115.05,
 "paddingLeft": 0,
 "right": "0%",
 "children": [
  "this.Container_5A0D64CF_5772_E32E_41D0_3F190463451B",
  "this.Container_5A0D44CF_5772_E32E_41D0_19B23A64B7F8"
 ],
 "minWidth": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "contentOpaque": false,
 "top": "0%",
 "verticalAlign": "top",
 "layout": "absolute",
 "height": 641,
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "shadow": false,
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "data": {
  "name": "--SETTINGS"
 },
 "gap": 10,
 "paddingBottom": 0,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "id": "Container_46D2A939_57B6_2572_41BD_BAA93AA47AA5",
 "minHeight": 1,
 "children": [
  "this.IconButton_46D29939_57B6_2572_4181_A29735EA1C2F"
 ],
 "class": "Container",
 "left": "0%",
 "right": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "layout": "absolute",
 "height": "12.832%",
 "paddingRight": 0,
 "backgroundOpacity": 0.6,
 "backgroundImageUrl": "skin/Container_46D2A939_57B6_2572_41BD_BAA93AA47AA5.png",
 "borderRadius": 0,
 "bottom": "0%",
 "borderSize": 0,
 "shadow": false,
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "data": {
  "name": "--- MENU"
 },
 "paddingBottom": 0,
 "gap": 10,
 "overflow": "visible",
 "scrollBarVisible": "rollOver"
},
{
 "fontFamily": "Arial",
 "paddingLeft": 5,
 "id": "DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8",
 "minHeight": 20,
 "popUpBackgroundOpacity": 0.72,
 "left": 30,
 "width": "11.212%",
 "class": "DropDown",
 "fontColor": "#333333",
 "minWidth": 200,
 "popUpShadow": false,
 "popUpFontColor": "#000000",
 "popUpShadowBlurRadius": 6,
 "arrowColor": "#8A8A8A",
 "popUpBorderRadius": 0,
 "top": 40,
 "popUpShadowOpacity": 0,
 "popUpShadowColor": "#000000",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.72,
 "paddingRight": 5,
 "height": "3.618%",
 "playList": "this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist",
 "fontSize": 14,
 "rollOverPopUpBackgroundColor": "#CCCCCC",
 "borderRadius": 4,
 "popUpShadowSpread": 1,
 "borderSize": 0,
 "shadow": false,
 "arrowBeforeLabel": false,
 "propagateClick": false,
 "paddingTop": 0,
 "selectedPopUpBackgroundColor": "#33CCFF",
 "backgroundColorRatios": [
  0
 ],
 "popUpGap": 0,
 "fontStyle": "normal",
 "paddingBottom": 0,
 "gap": 0,
 "textDecoration": "none",
 "data": {
  "name": "DropDown1204"
 },
 "popUpBackgroundColor": "#FFFFFF",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "paddingLeft": 0,
 "id": "IconButton_5A0D14CF_5772_E32E_4158_F5607133AB8C",
 "minHeight": 1,
 "width": 58,
 "iconURL": "skin/IconButton_5A0D14CF_5772_E32E_4158_F5607133AB8C.png",
 "class": "IconButton",
 "minWidth": 1,
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_5A0D14CF_5772_E32E_4158_F5607133AB8C_pressed.png",
 "pressedRollOverIconURL": "skin/IconButton_5A0D14CF_5772_E32E_4158_F5607133AB8C_pressed_rollover.png",
 "verticalAlign": "middle",
 "height": 58,
 "paddingRight": 0,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "maxWidth": 58,
 "borderRadius": 0,
 "borderSize": 0,
 "shadow": false,
 "propagateClick": true,
 "paddingTop": 0,
 "transparencyActive": true,
 "maxHeight": 58,
 "data": {
  "name": "IconButton FULLSCREEN"
 },
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "paddingLeft": 0,
 "id": "IconButton_5A0D34CF_5772_E32E_41C5_75E2393767BE",
 "minHeight": 1,
 "width": 58,
 "iconURL": "skin/IconButton_5A0D34CF_5772_E32E_41C5_75E2393767BE.png",
 "class": "IconButton",
 "minWidth": 1,
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_5A0D34CF_5772_E32E_41C5_75E2393767BE_pressed.png",
 "pressedRollOverIconURL": "skin/IconButton_5A0D34CF_5772_E32E_41C5_75E2393767BE_pressed_rollover.png",
 "verticalAlign": "middle",
 "height": 58,
 "paddingRight": 0,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "maxWidth": 58,
 "borderRadius": 0,
 "borderSize": 0,
 "shadow": false,
 "propagateClick": true,
 "paddingTop": 0,
 "transparencyActive": true,
 "maxHeight": 58,
 "data": {
  "name": "IconButton MUTE"
 },
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCD8E0B5_B1BD_E859_41D5_815DEC60F1EA, this.camera_A01179FF_B1C1_413A_41D9_D9F8DACAEB4D); this.mainPlayList.set('selectedIndex', 5)",
   "toolTip": "Swimming Pool"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -163.18,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCD26511_B1BD_E859_41D5_6990CBF48BF7_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -6.36,
   "hfov": 8.94
  }
 ],
 "data": {
  "label": "Circle Gneric 03"
 },
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A06F068D_B1C1_43DF_41E0_6ED076E39842",
   "pitch": -6.36,
   "yaw": -163.18,
   "hfov": 8.94,
   "distance": 50
  }
 ],
 "id": "overlay_BFA94605_B1C6_C2CF_41D7_43B8749BFBBC",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCD26511_B1BD_E859_41D5_6990CBF48BF7, this.camera_A024C981_B1C1_41C7_41E3_AAE6100C82F6); this.mainPlayList.set('selectedIndex', 6)",
   "toolTip": "KidsPool"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -85.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCD8E0B5_B1BD_E859_41D5_815DEC60F1EA_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -1.33,
   "hfov": 9
  }
 ],
 "data": {
  "label": "Circle Gneric 03"
 },
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A06FB68D_B1C1_43DF_41A7_1551A5442D8B",
   "pitch": -1.33,
   "yaw": -85.3,
   "hfov": 9,
   "distance": 50
  }
 ],
 "id": "overlay_BC387D9C_B1C1_41FD_41E0_60326CCB947D",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BFA03C51_B1BD_18D9_41E3_87F47E2C6B08, this.camera_A05AE950_B1C1_4145_4194_43E2AF29BEBE); this.mainPlayList.set('selectedIndex', 2)",
   "toolTip": "JungleArea"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -144.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BF53F03C_B1BF_284F_41DD_C352FC8418D0_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -3.02,
   "hfov": 8.99
  }
 ],
 "data": {
  "label": "Circle Generic 03"
 },
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A069968D_B1C1_43DF_41B2_904175A4FD51",
   "pitch": -3.02,
   "yaw": -144.6,
   "hfov": 8.99,
   "distance": 50
  }
 ],
 "id": "overlay_BF53E03C_B1BF_284F_41CE_D9D7A47EB05D",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFFFAD1_B1BF_39D9_41D2_509879A2CEA3, this.camera_A04E9921_B1C1_4EC6_41C8_3FED24DDAE46); this.mainPlayList.set('selectedIndex', 0)",
   "toolTip": "TennisArea"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 108.79,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BF53F03C_B1BF_284F_41DD_C352FC8418D0_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -1.2,
   "hfov": 9
  }
 ],
 "data": {
  "label": "Circle Generic 03"
 },
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A069D68D_B1C1_43DF_41D2_28AA1DFABF4F",
   "pitch": -1.2,
   "yaw": 108.79,
   "hfov": 9,
   "distance": 50
  }
 ],
 "id": "overlay_BF53D03C_B1BF_284F_41D2_34FFDB005516",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "toolTip": "Basketball Court"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -23.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BF53F03C_B1BF_284F_41DD_C352FC8418D0_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.42,
   "hfov": 9
  }
 ],
 "data": {
  "label": "Circle Gneric 03"
 },
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A069168D_B1C1_43DF_41BD_92B4871AA702",
   "pitch": 0.42,
   "yaw": -23.75,
   "hfov": 9,
   "distance": 50
  }
 ],
 "id": "overlay_BF05CE60_B1C1_4345_41D9_A623A4E87C92",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "paddingLeft": 0,
 "id": "IconButton_5A0D54CF_5772_E32E_41CC_563BC5A99C44",
 "minHeight": 1,
 "width": 58,
 "iconURL": "skin/IconButton_5A0D54CF_5772_E32E_41CC_563BC5A99C44.png",
 "class": "IconButton",
 "minWidth": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "height": 58,
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "maxWidth": 58,
 "rollOverIconURL": "skin/IconButton_5A0D54CF_5772_E32E_41CC_563BC5A99C44_rollover.png",
 "borderRadius": 0,
 "borderSize": 0,
 "shadow": false,
 "propagateClick": true,
 "paddingTop": 0,
 "transparencyActive": true,
 "maxHeight": 58,
 "data": {
  "name": "IconButton VR"
 },
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "paddingLeft": 0,
 "id": "IconButton_46D29939_57B6_2572_4181_A29735EA1C2F",
 "minHeight": 1,
 "width": 49,
 "class": "IconButton",
 "right": 30,
 "iconURL": "skin/IconButton_46D29939_57B6_2572_4181_A29735EA1C2F.png",
 "horizontalAlign": "center",
 "minWidth": 1,
 "verticalAlign": "middle",
 "bottom": 8,
 "height": 37,
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "rollOverIconURL": "skin/IconButton_46D29939_57B6_2572_4181_A29735EA1C2F_rollover.png",
 "borderRadius": 0,
 "maxWidth": 49,
 "borderSize": 0,
 "shadow": false,
 "propagateClick": true,
 "paddingTop": 0,
 "transparencyActive": true,
 "maxHeight": 37,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton VR"
 },
 "cursor": "hand"
},
{
 "paddingLeft": 0,
 "id": "IconButton_5A0D04CF_5772_E32E_41BB_81FF7DA1667F",
 "minHeight": 1,
 "width": 58,
 "iconURL": "skin/IconButton_5A0D04CF_5772_E32E_41BB_81FF7DA1667F.png",
 "class": "IconButton",
 "minWidth": 1,
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_5A0D04CF_5772_E32E_41BB_81FF7DA1667F_pressed.png",
 "pressedRollOverIconURL": "skin/IconButton_5A0D04CF_5772_E32E_41BB_81FF7DA1667F_pressed_rollover.png",
 "verticalAlign": "middle",
 "height": 58,
 "paddingRight": 0,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "maxWidth": 58,
 "borderRadius": 0,
 "borderSize": 0,
 "shadow": false,
 "propagateClick": true,
 "paddingTop": 0,
 "transparencyActive": true,
 "maxHeight": 58,
 "data": {
  "name": "IconButton HS "
 },
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "paddingLeft": 0,
 "id": "IconButton_5A0D24CF_5772_E32E_41D2_D193D2C1028D",
 "minHeight": 1,
 "width": 58,
 "iconURL": "skin/IconButton_5A0D24CF_5772_E32E_41D2_D193D2C1028D.png",
 "class": "IconButton",
 "minWidth": 1,
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_5A0D24CF_5772_E32E_41D2_D193D2C1028D_pressed.png",
 "pressedRollOverIconURL": "skin/IconButton_5A0D24CF_5772_E32E_41D2_D193D2C1028D_pressed_rollover.png",
 "verticalAlign": "middle",
 "height": 58,
 "paddingRight": 0,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "maxWidth": 58,
 "borderRadius": 0,
 "borderSize": 0,
 "shadow": false,
 "propagateClick": true,
 "paddingTop": 0,
 "transparencyActive": true,
 "maxHeight": 58,
 "data": {
  "name": "IconButton GYRO"
 },
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BF53F03C_B1BF_284F_41DD_C352FC8418D0, this.camera_A03749A0_B1C1_41C5_41C1_4AB7F3A4980D); this.mainPlayList.set('selectedIndex', 1)",
   "toolTip": "TreeHouseKids"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -42.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFFFAD1_B1BF_39D9_41D2_509879A2CEA3_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -1.27,
   "hfov": 9
  }
 ],
 "data": {
  "label": "Circle Generic 03"
 },
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A068067D_B1C1_433F_41C2_ECE681264350",
   "pitch": -1.27,
   "yaw": -42.6,
   "hfov": 9,
   "distance": 50
  }
 ],
 "id": "overlay_BCFC6AD1_B1BF_39D9_41D8_76DCCED9DE03",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BF53F03C_B1BF_284F_41DD_C352FC8418D0, this.camera_A00689D0_B1C1_4146_41CE_DD589597F0B4); this.mainPlayList.set('selectedIndex', 1)",
   "toolTip": "TreeHouseKids"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -70.48,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BFA03C51_B1BD_18D9_41E3_87F47E2C6B08_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -2.1,
   "hfov": 8.99
  }
 ],
 "data": {
  "label": "Circle Gneric 03"
 },
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A069668D_B1C1_43DF_41E4_19C37454CF60",
   "pitch": -2.1,
   "yaw": -70.48,
   "hfov": 8.99,
   "distance": 50
  }
 ],
 "id": "overlay_BFA02C51_B1BD_18D9_41E0_23AA3D06BE02",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "toolTip": "Amphi"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 47.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BFA03C51_B1BD_18D9_41E3_87F47E2C6B08_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -0.83,
   "hfov": 9
  }
 ],
 "data": {
  "label": "Circle Gneric 03"
 },
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A06EB68D_B1C1_43DF_41AE_DC5BED9E55EB",
   "pitch": -0.83,
   "yaw": 47.6,
   "hfov": 9,
   "distance": 50
  }
 ],
 "id": "overlay_BCAC58E8_B1BF_CF46_41E4_5F64D139A388",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "toolTip": "Amphi"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -140.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEA59E2_B1BD_1BFB_41BA_CBA168D7A437_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 1.18,
   "hfov": 9
  }
 ],
 "data": {
  "label": "Circle Gneric 03"
 },
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A06E468D_B1C1_43DF_41E0_8656C28FA450",
   "pitch": 1.18,
   "yaw": -140.07,
   "hfov": 9,
   "distance": 50
  }
 ],
 "id": "overlay_BFBBFE8E_B1CE_C3DD_41D5_FAA5BDD199E0",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "toolTip": "Swimming Pool"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -60.68,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BFAD8E2D_B1BD_3849_41BD_67EB93C125B9_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -3.6,
   "hfov": 8.98
  }
 ],
 "data": {
  "label": "Circle Gneric 03"
 },
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A06E068D_B1C1_43DF_41D8_3B9946647623",
   "pitch": -3.6,
   "yaw": -60.68,
   "hfov": 8.98,
   "distance": 50
  }
 ],
 "id": "overlay_BD15F850_B1C3_4F45_41E1_828C900FF787",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_5A0D64CF_5772_E32E_41D0_3F190463451B",
 "minHeight": 1,
 "width": 110,
 "paddingLeft": 0,
 "right": "0%",
 "children": [
  "this.IconButton_5A0D74CF_5772_E32E_41CA_B71D343F60D3"
 ],
 "minWidth": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "contentOpaque": false,
 "top": "0%",
 "verticalAlign": "middle",
 "layout": "horizontal",
 "height": 110,
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "shadow": false,
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "data": {
  "name": "button menu sup"
 },
 "gap": 10,
 "paddingBottom": 0,
 "overflow": "visible",
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "id": "Container_5A0D44CF_5772_E32E_41D0_19B23A64B7F8",
 "minHeight": 1,
 "children": [
  "this.IconButton_5A0D54CF_5772_E32E_41CC_563BC5A99C44",
  "this.IconButton_5A0D24CF_5772_E32E_41D2_D193D2C1028D",
  "this.IconButton_5A0D34CF_5772_E32E_41C5_75E2393767BE",
  "this.IconButton_5A0D04CF_5772_E32E_41BB_81FF7DA1667F",
  "this.IconButton_5A0D14CF_5772_E32E_4158_F5607133AB8C",
  "this.IconButton_5A0DE4CF_5772_E32E_41B2_E8D74E2067B2",
  "this.IconButton_5A0DF4CF_5772_E32E_41CE_2196B58CC419"
 ],
 "right": "0%",
 "width": "91.304%",
 "class": "Container",
 "minWidth": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "contentOpaque": false,
 "verticalAlign": "top",
 "layout": "vertical",
 "height": "85.959%",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "bottom": "0%",
 "borderSize": 0,
 "shadow": false,
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "data": {
  "name": "-button set"
 },
 "paddingBottom": 0,
 "gap": 3,
 "visible": false,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver"
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_BCD26511_B1BD_E859_41D5_6990CBF48BF7_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ],
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_A06F068D_B1C1_43DF_41E0_6ED076E39842",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_BCD8E0B5_B1BD_E859_41D5_815DEC60F1EA_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ],
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_A06FB68D_B1C1_43DF_41A7_1551A5442D8B",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_BF53F03C_B1BF_284F_41DD_C352FC8418D0_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ],
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_A069968D_B1C1_43DF_41B2_904175A4FD51",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_BF53F03C_B1BF_284F_41DD_C352FC8418D0_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ],
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_A069D68D_B1C1_43DF_41D2_28AA1DFABF4F",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_BF53F03C_B1BF_284F_41DD_C352FC8418D0_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ],
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_A069168D_B1C1_43DF_41BD_92B4871AA702",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_BCFFFAD1_B1BF_39D9_41D2_509879A2CEA3_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ],
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_A068067D_B1C1_433F_41C2_ECE681264350",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_BFA03C51_B1BD_18D9_41E3_87F47E2C6B08_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ],
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_A069668D_B1C1_43DF_41E4_19C37454CF60",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_BFA03C51_B1BD_18D9_41E3_87F47E2C6B08_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ],
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_A06EB68D_B1C1_43DF_41AE_DC5BED9E55EB",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_BCEA59E2_B1BD_1BFB_41BA_CBA168D7A437_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ],
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_A06E468D_B1C1_43DF_41E0_8656C28FA450",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_BFAD8E2D_B1BD_3849_41BD_67EB93C125B9_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ],
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_A06E068D_B1C1_43DF_41D8_3B9946647623",
 "colCount": 4
},
{
 "paddingLeft": 0,
 "id": "IconButton_5A0D74CF_5772_E32E_41CA_B71D343F60D3",
 "minHeight": 1,
 "width": 60,
 "iconURL": "skin/IconButton_5A0D74CF_5772_E32E_41CA_B71D343F60D3.png",
 "class": "IconButton",
 "minWidth": 1,
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_5A0D74CF_5772_E32E_41CA_B71D343F60D3_pressed.png",
 "pressedRollOverIconURL": "skin/IconButton_5A0D74CF_5772_E32E_41CA_B71D343F60D3_pressed_rollover.png",
 "verticalAlign": "middle",
 "height": 60,
 "paddingRight": 0,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "maxWidth": 60,
 "click": "if(!this.Container_5A0D44CF_5772_E32E_41D0_19B23A64B7F8.get('visible')){ this.setComponentVisibility(this.Container_5A0D44CF_5772_E32E_41D0_19B23A64B7F8, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_5A0D44CF_5772_E32E_41D0_19B23A64B7F8, false, 0, null, null, false) }",
 "borderRadius": 0,
 "borderSize": 0,
 "shadow": false,
 "propagateClick": true,
 "paddingTop": 0,
 "transparencyActive": true,
 "maxHeight": 60,
 "data": {
  "name": "image button menu"
 },
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "paddingLeft": 0,
 "id": "IconButton_5A0DE4CF_5772_E32E_41B2_E8D74E2067B2",
 "minHeight": 1,
 "width": 58,
 "iconURL": "skin/IconButton_5A0DE4CF_5772_E32E_41B2_E8D74E2067B2.png",
 "class": "IconButton",
 "minWidth": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "height": 58,
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "maxWidth": 58,
 "rollOverIconURL": "skin/IconButton_5A0DE4CF_5772_E32E_41B2_E8D74E2067B2_rollover.png",
 "borderRadius": 0,
 "borderSize": 0,
 "shadow": false,
 "click": "this.shareTwitter(window.location.href)",
 "propagateClick": true,
 "paddingTop": 0,
 "transparencyActive": true,
 "maxHeight": 58,
 "data": {
  "name": "IconButton TWITTER"
 },
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "paddingLeft": 0,
 "id": "IconButton_5A0DF4CF_5772_E32E_41CE_2196B58CC419",
 "minHeight": 1,
 "width": 58,
 "iconURL": "skin/IconButton_5A0DF4CF_5772_E32E_41CE_2196B58CC419.png",
 "class": "IconButton",
 "minWidth": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "height": 58,
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "maxWidth": 58,
 "rollOverIconURL": "skin/IconButton_5A0DF4CF_5772_E32E_41CE_2196B58CC419_rollover.png",
 "borderRadius": 0,
 "borderSize": 0,
 "shadow": false,
 "click": "this.shareFacebook(window.location.href)",
 "propagateClick": true,
 "paddingTop": 0,
 "transparencyActive": true,
 "maxHeight": 58,
 "data": {
  "name": "IconButton FB"
 },
 "paddingBottom": 0,
 "cursor": "hand"
}],
 "shadow": false,
 "desktopMipmappingEnabled": false,
 "propagateClick": false,
 "paddingTop": 0,
 "mouseWheelEnabled": true,
 "backgroundPreloadEnabled": true,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "mobileMipmappingEnabled": false,
 "data": {
  "name": "Player445"
 },
 "paddingBottom": 0,
 "gap": 10,
 "overflow": "visible",
 "vrPolyfillScale": 0.5
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
