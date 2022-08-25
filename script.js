(function(){
    var script = {
 "scrollBarMargin": 2,
 "id": "rootPlayer",
 "children": [
  "this.MainViewer",
  "this.Container_5A0DC4CF_5772_E32E_41CD_F6650DCF6BF2",
  "this.Container_46D2A939_57B6_2572_41BD_BAA93AA47AA5",
  "this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8"
 ],
 "horizontalAlign": "left",
 "start": "this.playAudioList([this.audio_3474E1DB_05BF_06CA_4181_847828A6CE51]); this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_5A0D24CF_5772_E32E_41D2_D193D2C1028D], 'gyroscopeAvailable'); this.syncPlaylists([this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.IconButton_5A0D14CF_5772_E32E_4158_F5607133AB8C].forEach(function(component) { component.set('visible', false); }) }",
 "width": "100%",
 "borderSize": 0,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "defaultVRPointer": "laser",
 "buttonToggleFullscreen": "this.IconButton_5A0D14CF_5772_E32E_4158_F5607133AB8C",
 "scripts": {
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "unregisterKey": function(key){  delete window[key]; },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "existsKey": function(key){  return key in window; },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "getKey": function(key){  return window[key]; },
  "registerKey": function(key, value){  window[key] = value; },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; }
 },
 "minHeight": 20,
 "downloadEnabled": false,
 "paddingRight": 0,
 "verticalAlign": "top",
 "height": "100%",
 "minWidth": 20,
 "borderRadius": 0,
 "buttonToggleMute": "this.IconButton_5A0D34CF_5772_E32E_41C5_75E2393767BE",
 "paddingLeft": 0,
 "definitions": [{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_camera",
 "automaticZoomSpeed": 10
},
{
 "loop": true,
 "audio": "this.audioresource_C6563C7D_D379_02F9_41C8_9CB3BDC478C4",
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_C6561C7D_D379_02F9_41E3_8F916F23D069",
 "data": {
  "label": "Pool"
 }
},
{
 "class": "Photo",
 "label": "Kids_Hi res",
 "duration": 5000,
 "thumbnailUrl": "media/photo_765DDD36_7A52_D51C_41D4_71F91FECEBAB_t.jpg",
 "width": 4000,
 "id": "photo_765DDD36_7A52_D51C_41D4_71F91FECEBAB",
 "image": {
  "levels": [
   {
    "url": "media/photo_765DDD36_7A52_D51C_41D4_71F91FECEBAB.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 2500
},
{
 "items": [
  {
   "media": "this.panorama_CB286B53_C648_12A0_41CE_C15E45AC9836",
   "camera": "this.panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9",
   "camera": "this.panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03",
   "camera": "this.panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CB57721D_C648_72A0_41E3_FAC6439D7805",
   "camera": "this.panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CB503455_C648_16A0_41CF_FF7584B17D37",
   "camera": "this.panorama_CB503455_C648_16A0_41CF_FF7584B17D37_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CB5546BC_C648_33E0_41E6_9A599596894C",
   "camera": "this.panorama_CB5546BC_C648_33E0_41E6_9A599596894C_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CB5D789E_C648_1FA0_41DF_496B2603085E",
   "camera": "this.panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA",
   "camera": "this.panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C",
   "camera": "this.panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3",
   "camera": "this.panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C",
   "camera": "this.panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F",
   "camera": "this.panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "end": "this.trigger('tourEnded')"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -126.65,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_C3A5F1D6_D3B1_28B6_41E6_FEB4ADD1815F",
 "automaticZoomSpeed": 10
},
{
 "class": "Photo",
 "label": "Living _Hi res 2",
 "duration": 5000,
 "thumbnailUrl": "media/photo_769C2E67_7A53_D73C_41AF_9CA58A04F3AE_t.jpg",
 "width": 4000,
 "id": "photo_769C2E67_7A53_D73C_41AF_9CA58A04F3AE",
 "image": {
  "levels": [
   {
    "url": "media/photo_769C2E67_7A53_D73C_41AF_9CA58A04F3AE.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 2250
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 72.92,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_C3E8B275_D3B1_2B8A_41DD_9099CA5A8116",
 "automaticZoomSpeed": 10
},
{
 "audio": {
  "mp3Url": "media/audio_CA545BBC_D307_1962_41B2_7F5747C0C9B0.mp3",
  "class": "AudioResource",
  "oggUrl": "media/audio_CA545BBC_D307_1962_41B2_7F5747C0C9B0.ogg"
 },
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_CA545BBC_D307_1962_41B2_7F5747C0C9B0",
 "data": {
  "label": "basketball"
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -46.2,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_C3237336_D3B1_29F6_41A1_50AB93ABD0CD",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 54.53,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_C3330314_D3B1_298A_41D2_FF0C2B0D508C",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 109.29,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_C39BC1F6_D3B1_2876_41BC_A40CF08EE72B",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -121.08,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_DC604158_D3B1_29BA_41E2_D7C61AB8C7F7",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 76.13,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_DC50C177_D3B1_2876_41B9_5C691432399D",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 139.19,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_C38A6225_D3B1_2B8A_41C7_5A9743EA060B",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_camera",
 "automaticZoomSpeed": 10
},
{
 "loop": true,
 "audio": "this.audioresource_C7DFD00B_D309_0218_41C4_77F71F7F97A9",
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_C6777395_D309_0609_41DA_BA3F712D96C1",
 "data": {
  "label": "Jungle"
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 93.47,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_C33D22F3_D3B1_288E_41D1_8A37AD48252F",
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "media": "this.panorama_CB286B53_C648_12A0_41CE_C15E45AC9836",
   "camera": "this.panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9",
   "camera": "this.panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03",
   "camera": "this.panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CB57721D_C648_72A0_41E3_FAC6439D7805",
   "camera": "this.panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CB503455_C648_16A0_41CF_FF7584B17D37",
   "camera": "this.panorama_CB503455_C648_16A0_41CF_FF7584B17D37_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CB5546BC_C648_33E0_41E6_9A599596894C",
   "camera": "this.panorama_CB5546BC_C648_33E0_41E6_9A599596894C_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CB5D789E_C648_1FA0_41DF_496B2603085E",
   "camera": "this.panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA",
   "camera": "this.panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C",
   "camera": "this.panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3",
   "camera": "this.panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C",
   "camera": "this.panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F",
   "camera": "this.panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 11, 0)",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ],
 "id": "DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist",
 "class": "PlayList"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_camera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -13.8,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_DC113107_D3B1_2996_41E7_ADD1ABFB7601",
 "automaticZoomSpeed": 10
},
{
 "loop": true,
 "audio": "this.audioresource_C7DFD00B_D309_0218_41C4_77F71F7F97A9",
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_C7DE200B_D309_0218_41E3_0FD63E9F7759",
 "data": {
  "label": "Jungle"
 }
},
{
 "loop": true,
 "audio": {
  "mp3Url": "media/audio_C9D12C2A_D309_1F67_41B3_203EFD467A1C.mp3",
  "class": "AudioResource",
  "oggUrl": "media/audio_C9D12C2A_D309_1F67_41B3_203EFD467A1C.ogg"
 },
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_C9D12C2A_D309_1F67_41B3_203EFD467A1C",
 "data": {
  "label": "KidsBouncy"
 }
},
{
 "audio": {
  "mp3Url": "media/audio_3474E1DB_05BF_06CA_4181_847828A6CE51.mp3",
  "class": "AudioResource",
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
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -35.66,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_C3CEC2C4_D3B1_288A_41B7_8B52796DEC88",
 "automaticZoomSpeed": 10
},
{
 "id": "MainViewerVideoPlayer",
 "viewerArea": "this.MainViewer",
 "displayPlaybackBar": true,
 "class": "VideoPlayer"
},
{
 "hfovMin": "135%",
 "id": "panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9",
 "thumbnailUrl": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_t.jpg",
 "hfov": 360,
 "label": "Children play area",
 "pitch": 0,
 "audios": [
  "this.audio_C6777395_D309_0609_41DA_BA3F712D96C1",
  "this.audio_C6E85303_D30B_0609_41E4_E6A4F1E07FDF"
 ],
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03",
   "yaw": 133.8,
   "backwardYaw": 157.91,
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_CB286B53_C648_12A0_41CE_C15E45AC9836",
   "yaw": -107.08,
   "backwardYaw": -45.18,
   "distance": 1,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_C9196D8F_C658_11A0_41AF_17CE6B9C167C",
  "this.overlay_C8A72E70_C658_3360_41D7_91663109CC70"
 ],
 "partial": false
},
{
 "hfovMin": "135%",
 "id": "panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03",
 "thumbnailUrl": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_t.jpg",
 "hfov": 360,
 "label": "Swimming pool",
 "pitch": 0,
 "audios": [
  "this.audio_C6667E68_D379_FE07_41E6_E0F496B95754"
 ],
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_CB57721D_C648_72A0_41E3_FAC6439D7805",
   "yaw": -86.53,
   "backwardYaw": 166.2,
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9",
   "yaw": 157.91,
   "backwardYaw": 133.8,
   "distance": 1,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_C980AAD4_C658_F3A0_41B9_D335A00014D9",
  "this.overlay_D3AAF2E8_C658_1360_41BC_F73E95F14A08"
 ],
 "partial": false
},
{
 "loop": true,
 "audio": "this.audioresource_C6563C7D_D379_02F9_41C8_9CB3BDC478C4",
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_C6667E68_D379_FE07_41E6_E0F496B95754",
 "data": {
  "label": "Pool"
 }
},
{
 "loop": true,
 "audio": "this.audioresource_C4B7C8B3_D319_0765_41E1_3F689F7EDF9C",
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_C872A4E6_D33B_08EF_41E0_E5F7052D2390",
 "data": {
  "label": "Crowd"
 }
},
{
 "class": "Photo",
 "label": "Kitchen_Hi res",
 "duration": 5000,
 "thumbnailUrl": "media/photo_767255C6_7A52_557C_41DD_51216B6F3598_t.jpg",
 "width": 4000,
 "id": "photo_767255C6_7A52_557C_41DD_51216B6F3598",
 "image": {
  "levels": [
   {
    "url": "media/photo_767255C6_7A52_557C_41DD_51216B6F3598.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 3334
},
{
 "hfovMin": "135%",
 "id": "panorama_CB286B53_C648_12A0_41CE_C15E45AC9836",
 "thumbnailUrl": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_t.jpg",
 "hfov": 360,
 "label": "Tree House",
 "pitch": 0,
 "audios": [
  "this.audio_C65283F4_D379_0608_41DD_FE4F690D61DD",
  "this.audio_C61B79A8_D309_0218_41E2_8680D3E8EB7D"
 ],
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9",
   "yaw": -45.18,
   "backwardYaw": -107.08,
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C",
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_C994B4EE_C648_3760_41E6_517AAD9B63F0",
  "this.overlay_D1F2775B_C6B8_32A0_41D0_E538B6AC53CC"
 ],
 "partial": false
},
{
 "audio": {
  "mp3Url": "media/audio_CF5336EC_D339_08E3_41B3_BBCE8323C51E.mp3",
  "class": "AudioResource",
  "oggUrl": "media/audio_CF5336EC_D339_08E3_41B3_BBCE8323C51E.ogg"
 },
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_CF5336EC_D339_08E3_41B3_BBCE8323C51E",
 "data": {
  "label": "party"
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 4.28,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_C3112355_D3B1_298A_41E2_76D34B1DCE07",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_camera",
 "automaticZoomSpeed": 10
},
{
 "hfovMin": "135%",
 "id": "panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA",
 "thumbnailUrl": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_t.jpg",
 "hfov": 360,
 "label": "Basketball court ",
 "pitch": 0,
 "audios": [
  "this.audio_CA545BBC_D307_1962_41B2_7F5747C0C9B0"
 ],
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C",
   "yaw": -91.81,
   "backwardYaw": -125.47,
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_CB5D789E_C648_1FA0_41DF_496B2603085E",
   "yaw": -40.81,
   "backwardYaw": 133.8,
   "distance": 1,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_D4364F5F_C678_F2A0_41B6_1A9DCC7E42E8",
  "this.overlay_D38EFB1B_C658_12A0_41D2_B522C073959F"
 ],
 "partial": false
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -22.09,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_DC7D0136_D3B1_29F6_41BA_7EA84728DCE0",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 56.54,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_C3B531A6_D3B1_2896_41E1_9C9CFCA3F748",
 "automaticZoomSpeed": 10
},
{
 "loop": true,
 "audio": "this.audioresource_C7DFD00B_D309_0218_41C4_77F71F7F97A9",
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_C09492BD_D30B_0679_41E3_2366911C5FDC",
 "data": {
  "label": "Jungle"
 }
},
{
 "audio": "this.audioresource_C6E87303_D30B_0609_41C2_D93556F6CB1A",
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_C6E85303_D30B_0609_41E4_E6A4F1E07FDF",
 "data": {
  "label": "Children"
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_camera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_CB503455_C648_16A0_41CF_FF7584B17D37_camera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 88.19,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_DC46F187_D3B1_2896_41E2_7BC20E587CB4",
 "automaticZoomSpeed": 10
},
{
 "hfovMin": "135%",
 "id": "panorama_CB5546BC_C648_33E0_41E6_9A599596894C",
 "thumbnailUrl": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_t.jpg",
 "hfov": 360,
 "label": "Party Lawn",
 "pitch": 0,
 "audios": [
  "this.audio_CF5336EC_D339_08E3_41B3_BBCE8323C51E"
 ],
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_CB503455_C648_16A0_41CF_FF7584B17D37",
   "yaw": -120.2,
   "backwardYaw": 58.92,
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_CB5D789E_C648_1FA0_41DF_496B2603085E",
   "yaw": 168.46,
   "backwardYaw": -103.87,
   "distance": 1,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_D75FF815_C67F_FEA0_41B4_848B0814519C",
  "this.overlay_D05F5FCF_C658_31A0_41E6_482134EEA526"
 ],
 "partial": false
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -11.54,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_C3F80246_D3B1_2B96_41D6_30680AA69D0E",
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "media": "this.video_DD053C7B_D3B7_787E_41C3_989F22BF25DC",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_DC2FA0D6_D3B1_28B6_41BB_DBF5ADC06D39, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_DC2FA0D6_D3B1_28B6_41BB_DBF5ADC06D39, 0)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
   "player": "this.MainViewerVideoPlayer"
  }
 ],
 "id": "playList_DC2FA0D6_D3B1_28B6_41BB_DBF5ADC06D39",
 "class": "PlayList"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_camera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "Photo",
 "label": "Master Bedroom _Hi res",
 "duration": 5000,
 "thumbnailUrl": "media/photo_7672A840_7A52_5B75_41D6_811C88787749_t.jpg",
 "width": 4000,
 "id": "photo_7672A840_7A52_5B75_41D6_811C88787749",
 "image": {
  "levels": [
   {
    "url": "media/photo_7672A840_7A52_5B75_41D6_811C88787749.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 2500
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_camera",
 "automaticZoomSpeed": 10
},
{
 "hfovMin": "135%",
 "id": "panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F",
 "thumbnailUrl": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_t.jpg",
 "hfov": 360,
 "label": "Bounce Land",
 "pitch": 0,
 "audios": [
  "this.audio_C9D12C2A_D309_1F67_41B3_203EFD467A1C"
 ],
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C",
   "yaw": -4.63,
   "backwardYaw": -175.72,
   "distance": 1,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_D53DFF54_C648_32A0_41E5_5EA08476668E"
 ],
 "partial": false
},
{
 "class": "PanoramaPlayer",
 "buttonToggleHotspots": "this.IconButton_5A0D04CF_5772_E32E_41BB_81FF7DA1667F",
 "id": "MainViewerPanoramaPlayer",
 "viewerArea": "this.MainViewer",
 "gyroscopeEnabled": true,
 "touchControlMode": "drag_rotation",
 "buttonToggleGyroscope": "this.IconButton_5A0D24CF_5772_E32E_41D2_D193D2C1028D",
 "gyroscopeVerticalDraggingEnabled": true,
 "buttonCardboardView": [
  "this.IconButton_5A0D54CF_5772_E32E_41CC_563BC5A99C44",
  "this.IconButton_46D29939_57B6_2572_4181_A29735EA1C2F"
 ],
 "mouseControlMode": "drag_acceleration",
 "displayPlaybackBar": true
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 134.82,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_DC724146_D3B1_2996_41DA_C79D0753CCFA",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_camera",
 "automaticZoomSpeed": 10
},
{
 "loop": true,
 "audio": "this.audioresource_C4B7C8B3_D319_0765_41E1_3F689F7EDF9C",
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_CA386D38_D319_7963_41C9_064456251874",
 "data": {
  "label": "Crowd"
 }
},
{
 "loop": true,
 "audio": {
  "mp3Url": "media/audio_CBF6FC4A_D309_1F27_41D4_DFFBC1286231.mp3",
  "class": "AudioResource",
  "oggUrl": "media/audio_CBF6FC4A_D309_1F27_41D4_DFFBC1286231.ogg"
 },
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_CBF6FC4A_D309_1F27_41D4_DFFBC1286231",
 "data": {
  "label": "tennis"
 }
},
{
 "hfovMin": "135%",
 "id": "panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C",
 "thumbnailUrl": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_t.jpg",
 "hfov": 360,
 "label": "Tennis court ",
 "pitch": 0,
 "audios": [
  "this.audio_CBF6FC4A_D309_1F27_41D4_DFFBC1286231"
 ],
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA",
   "yaw": -125.47,
   "backwardYaw": -91.81,
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3",
   "yaw": 53.35,
   "backwardYaw": -123.46,
   "distance": 1,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_D566BD25_C648_16E0_41DA_7B5329E8F533",
  "this.overlay_D2F5D202_C658_72A0_41E6_943C7F248E3A"
 ],
 "partial": false
},
{
 "hfovMin": "135%",
 "id": "panorama_CB57721D_C648_72A0_41E3_FAC6439D7805",
 "thumbnailUrl": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_t.jpg",
 "hfov": 360,
 "label": "Kids pool ",
 "pitch": 0,
 "audios": [
  "this.audio_C6561C7D_D379_02F9_41E3_8F916F23D069"
 ],
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03",
   "yaw": 166.2,
   "backwardYaw": -86.53,
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_CB503455_C648_16A0_41CF_FF7584B17D37",
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_D6AA6DD5_C648_71A0_41DA_F45F8F8D5CD9",
  "this.overlay_D665BC0C_C648_F6A0_41DE_331CD3F5972B"
 ],
 "partial": false
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_CB5546BC_C648_33E0_41E6_9A599596894C_camera",
 "automaticZoomSpeed": 10
},
{
 "hfovMin": "135%",
 "id": "panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C",
 "thumbnailUrl": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_t.jpg",
 "hfov": 360,
 "label": "Jungle Area",
 "pitch": 0,
 "audios": [
  "this.audio_C09492BD_D30B_0679_41E3_2366911C5FDC"
 ],
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F",
   "yaw": -175.72,
   "backwardYaw": -4.63,
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3",
   "yaw": -70.71,
   "backwardYaw": 144.34,
   "distance": 1,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_D57BA8C6_C648_FFA0_41D8_8318277867E7",
  "this.overlay_D25DBA7A_C648_7360_41CC_915449C35C0D"
 ],
 "partial": false
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 59.8,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_C3018365_D3B1_298A_41E5_760E73699D7A",
 "automaticZoomSpeed": 10
},
{
 "class": "Video",
 "label": "MLP",
 "scaleMode": "fit_inside",
 "thumbnailUrl": "media/video_DD053C7B_D3B7_787E_41C3_989F22BF25DC_t.jpg",
 "width": 3000,
 "loop": false,
 "id": "video_DD053C7B_D3B7_787E_41C3_989F22BF25DC",
 "height": 1500,
 "video": {
  "width": 3000,
  "class": "VideoResource",
  "height": 1500,
  "mp4Url": "media/video_DD053C7B_D3B7_787E_41C3_989F22BF25DC.mp4"
 }
},
{
 "hfovMin": "135%",
 "id": "panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3",
 "thumbnailUrl": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_t.jpg",
 "hfov": 360,
 "label": "Senior Citizen",
 "pitch": 0,
 "audios": [
  "this.audio_C49CD85B_D31B_0726_41B7_2DAF623B283E",
  "this.audio_CA386D38_D319_7963_41C9_064456251874"
 ],
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C",
   "yaw": -123.46,
   "backwardYaw": 53.35,
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C",
   "yaw": 144.34,
   "backwardYaw": -70.71,
   "distance": 1,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_D4DC880E_C648_3EA0_41E5_7681453BB95E",
  "this.overlay_D3913796_C648_F1A0_41DE_57F3C742BCAA"
 ],
 "partial": false
},
{
 "hfovMin": "135%",
 "id": "panorama_CB503455_C648_16A0_41CF_FF7584B17D37",
 "thumbnailUrl": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_t.jpg",
 "hfov": 360,
 "label": "Amphitheatre",
 "pitch": 0,
 "audios": [
  "this.audio_C872A4E6_D33B_08EF_41E0_E5F7052D2390"
 ],
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_CB5546BC_C648_33E0_41E6_9A599596894C",
   "yaw": 58.92,
   "backwardYaw": -120.2,
   "distance": 1,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_D737E693_C648_73A0_41DD_FBE8F38DA3C2",
  "this.overlay_D42BD371_C678_1160_41A6_0D1EDDF8E6C5"
 ],
 "partial": false
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 175.37,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_C3D8F2A5_D3B1_288A_41C2_ADA4E4CAC957",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -46.2,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_DC048117_D3B1_29B7_41BB_408A6F301DD1",
 "automaticZoomSpeed": 10
},
{
 "class": "Photo",
 "label": "Parents Bedroom_Hi res",
 "duration": 5000,
 "thumbnailUrl": "media/photo_765FF95D_7A52_BD0C_41D4_3173C32E180D_t.jpg",
 "width": 4000,
 "id": "photo_765FF95D_7A52_BD0C_41D4_3173C32E180D",
 "image": {
  "levels": [
   {
    "url": "media/photo_765FF95D_7A52_BD0C_41D4_3173C32E180D.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 2250
},
{
 "loop": true,
 "audio": "this.audioresource_C7DFD00B_D309_0218_41C4_77F71F7F97A9",
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_C49CD85B_D31B_0726_41B7_2DAF623B283E",
 "data": {
  "label": "Jungle"
 }
},
{
 "loop": true,
 "audio": "this.audioresource_C7DFD00B_D309_0218_41C4_77F71F7F97A9",
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_C65283F4_D379_0608_41DD_FE4F690D61DD",
 "data": {
  "label": "Jungle"
 }
},
{
 "loop": true,
 "audio": "this.audioresource_C6E87303_D30B_0609_41C2_D93556F6CB1A",
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_C61B79A8_D309_0218_41E2_8680D3E8EB7D",
 "data": {
  "label": "Children"
 }
},
{
 "hfovMin": "135%",
 "id": "panorama_CB5D789E_C648_1FA0_41DF_496B2603085E",
 "thumbnailUrl": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_t.jpg",
 "hfov": 360,
 "label": "Fruit tree orchard",
 "pitch": 0,
 "audios": [
  "this.audio_C7DE200B_D309_0218_41E3_0FD63E9F7759"
 ],
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA",
   "yaw": 133.8,
   "backwardYaw": -40.81,
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_CB5546BC_C648_33E0_41E6_9A599596894C",
   "yaw": -103.87,
   "backwardYaw": 168.46,
   "distance": 1,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_D429EB9C_C679_F1A0_41DE_FA83845518BB",
  "this.overlay_D3D00797_C658_31A0_41DD_47DB9BB0B6D3"
 ],
 "partial": false
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_camera",
 "automaticZoomSpeed": 10
},
{
 "toolTipFontSize": "1.11vmin",
 "toolTipOpacity": 1,
 "id": "MainViewer",
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "left": 0,
 "playbackBarRight": 0,
 "width": "100%",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarHeadShadowHorizontalLength": 0,
 "minHeight": 50,
 "playbackBarBorderRadius": 0,
 "paddingRight": 0,
 "playbackBarHeadBorderRadius": 0,
 "height": "100%",
 "playbackBarProgressBorderColor": "#000000",
 "minWidth": 100,
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
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
 "shadow": false,
 "progressOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "progressBottom": 0,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "borderSize": 0,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionMode": "blending",
 "toolTipBorderSize": 1,
 "displayTooltipInTouchScreens": true,
 "top": 0,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "transitionDuration": 500,
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
 "paddingLeft": 0,
 "progressBarBorderColor": "#000000",
 "paddingTop": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 5,
 "class": "ViewerArea",
 "progressBorderColor": "#000000",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "data": {
  "name": "Main Viewer"
 },
 "playbackBarProgressBackgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_5A0DC4CF_5772_E32E_41CD_F6650DCF6BF2",
 "width": 115.05,
 "horizontalAlign": "left",
 "right": "0%",
 "borderSize": 0,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "verticalAlign": "top",
 "minHeight": 1,
 "top": "0%",
 "paddingRight": 0,
 "height": 641,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingLeft": 0,
 "children": [
  "this.Container_5A0D64CF_5772_E32E_41D0_3F190463451B",
  "this.Container_5A0D44CF_5772_E32E_41D0_19B23A64B7F8"
 ],
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": true,
 "gap": 10,
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--SETTINGS"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "layout": "absolute"
},
{
 "scrollBarMargin": 2,
 "id": "Container_46D2A939_57B6_2572_41BD_BAA93AA47AA5",
 "left": "0%",
 "children": [
  "this.IconButton_46D29939_57B6_2572_4181_A29735EA1C2F"
 ],
 "backgroundImageUrl": "skin/Container_46D2A939_57B6_2572_41BD_BAA93AA47AA5.png",
 "right": "0%",
 "borderSize": 0,
 "contentOpaque": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingRight": 0,
 "height": "12.832%",
 "backgroundOpacity": 0.6,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingLeft": 0,
 "bottom": "0%",
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": true,
 "gap": 10,
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--- MENU"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "visible",
 "layout": "absolute"
},
{
 "fontFamily": "Arial",
 "data": {
  "name": "DropDown1204"
 },
 "id": "DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8",
 "popUpShadow": false,
 "left": 30,
 "width": "11.212%",
 "borderSize": 0,
 "playList": "this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist",
 "fontColor": "#333333",
 "arrowColor": "#8A8A8A",
 "popUpFontColor": "#000000",
 "minHeight": 20,
 "popUpShadowBlurRadius": 6,
 "popUpBorderRadius": 0,
 "top": 40,
 "popUpShadowOpacity": 0,
 "paddingRight": 5,
 "backgroundColor": [
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.72,
 "height": "3.618%",
 "minWidth": 200,
 "borderRadius": 4,
 "fontSize": 14,
 "rollOverPopUpBackgroundColor": "#CCCCCC",
 "arrowBeforeLabel": false,
 "paddingLeft": 5,
 "popUpShadowSpread": 1,
 "paddingTop": 0,
 "popUpShadowColor": "#000000",
 "paddingBottom": 0,
 "selectedPopUpBackgroundColor": "#33CCFF",
 "propagateClick": false,
 "gap": 0,
 "class": "DropDown",
 "backgroundColorRatios": [
  0
 ],
 "fontStyle": "normal",
 "textDecoration": "none",
 "popUpGap": 0,
 "shadow": false,
 "fontWeight": "normal",
 "popUpBackgroundColor": "#FFFFFF",
 "popUpBackgroundOpacity": 0.72,
 "backgroundColorDirection": "vertical"
},
{
 "maxWidth": 58,
 "id": "IconButton_5A0D14CF_5772_E32E_4158_F5607133AB8C",
 "maxHeight": 58,
 "width": 58,
 "horizontalAlign": "center",
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_5A0D14CF_5772_E32E_4158_F5607133AB8C_pressed.png",
 "verticalAlign": "middle",
 "pressedRollOverIconURL": "skin/IconButton_5A0D14CF_5772_E32E_4158_F5607133AB8C_pressed_rollover.png",
 "minHeight": 1,
 "paddingRight": 0,
 "height": 58,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "transparencyActive": true,
 "paddingLeft": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": true,
 "iconURL": "skin/IconButton_5A0D14CF_5772_E32E_4158_F5607133AB8C.png",
 "class": "IconButton",
 "data": {
  "name": "IconButton FULLSCREEN"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "maxWidth": 58,
 "id": "IconButton_5A0D34CF_5772_E32E_41C5_75E2393767BE",
 "maxHeight": 58,
 "width": 58,
 "horizontalAlign": "center",
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_5A0D34CF_5772_E32E_41C5_75E2393767BE_pressed.png",
 "verticalAlign": "middle",
 "pressedRollOverIconURL": "skin/IconButton_5A0D34CF_5772_E32E_41C5_75E2393767BE_pressed_rollover.png",
 "minHeight": 1,
 "paddingRight": 0,
 "height": 58,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "transparencyActive": true,
 "paddingLeft": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": true,
 "iconURL": "skin/IconButton_5A0D34CF_5772_E32E_41C5_75E2393767BE.png",
 "class": "IconButton",
 "data": {
  "name": "IconButton MUTE"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "mp3Url": "media/audio_C6667E68_D379_FE07_41E6_E0F496B95754.mp3",
 "class": "AudioResource",
 "id": "audioresource_C6563C7D_D379_02F9_41C8_9CB3BDC478C4",
 "oggUrl": "media/audio_C6667E68_D379_FE07_41E6_E0F496B95754.ogg"
},
{
 "mp3Url": "media/audio_C09492BD_D30B_0679_41E3_2366911C5FDC.mp3",
 "class": "AudioResource",
 "id": "audioresource_C7DFD00B_D309_0218_41C4_77F71F7F97A9",
 "oggUrl": "media/audio_C09492BD_D30B_0679_41E3_2366911C5FDC.ogg"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03, this.camera_DC7D0136_D3B1_29F6_41BA_7EA84728DCE0); this.mainPlayList.set('selectedIndex', 2)",
   "toolTip": "Swiming Pool",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "yaw": 133.8,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.22,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "image": "this.AnimatedImageResource_DC760415_C648_36A0_41BF_A7B5631ADD72",
   "pitch": 2.22,
   "yaw": 133.8,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_C9196D8F_C658_11A0_41AF_17CE6B9C167C",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CB286B53_C648_12A0_41CE_C15E45AC9836, this.camera_DC724146_D3B1_2996_41DA_C79D0753CCFA); this.mainPlayList.set('selectedIndex', 0)",
   "toolTip": "Tree House",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "yaw": -107.08,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.28,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "image": "this.AnimatedImageResource_DC767415_C648_36A0_41E6_5331B51055DB",
   "pitch": 0.28,
   "yaw": -107.08,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_C8A72E70_C658_3360_41D7_91663109CC70",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CB57721D_C648_72A0_41E3_FAC6439D7805, this.camera_DC113107_D3B1_2996_41E7_ADD1ABFB7601); this.mainPlayList.set('selectedIndex', 3)",
   "toolTip": "Kids Pool",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "yaw": -86.53,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.04,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "image": "this.AnimatedImageResource_DC769415_C648_36A0_41B6_A1276A0E3F75",
   "pitch": -0.04,
   "yaw": -86.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_C980AAD4_C658_F3A0_41B9_D335A00014D9",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9, this.camera_DC048117_D3B1_29B7_41BB_408A6F301DD1); this.mainPlayList.set('selectedIndex', 1)",
   "toolTip": "Children Play Area",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "yaw": 157.91,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.22,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "image": "this.AnimatedImageResource_DC752415_C648_36A0_41C3_5835385D58BD",
   "pitch": 1.22,
   "yaw": 157.91,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D3AAF2E8_C658_1360_41BC_F73E95F14A08",
 "enabledInCardboard": true
},
{
 "mp3Url": "media/audio_CA386D38_D319_7963_41C9_064456251874.mp3",
 "class": "AudioResource",
 "id": "audioresource_C4B7C8B3_D319_0765_41E1_3F689F7EDF9C",
 "oggUrl": "media/audio_CA386D38_D319_7963_41C9_064456251874.ogg"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9, this.camera_C3E8B275_D3B1_2B8A_41DD_9099CA5A8116); this.mainPlayList.set('selectedIndex', 1)",
   "toolTip": "Children Play Area",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "yaw": -45.18,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.16,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "image": "this.AnimatedImageResource_DC709415_C648_36A0_41D5_C37236551576",
   "pitch": -2.16,
   "yaw": -45.18,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_C994B4EE_C648_3760_41E6_517AAD9B63F0",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 8)",
   "toolTip": "Tennis Court",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "yaw": 111.33,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.64,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "image": "this.AnimatedImageResource_D03F86D4_C6C8_13A0_41E5_393FA8979039",
   "pitch": -0.64,
   "yaw": 111.33,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D1F2775B_C6B8_32A0_41D0_E538B6AC53CC",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C, this.camera_C3330314_D3B1_298A_41D2_FF0C2B0D508C); this.mainPlayList.set('selectedIndex', 8)",
   "toolTip": "Tennis Court",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "yaw": -91.81,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.22,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "image": "this.AnimatedImageResource_DC6BC415_C648_36A0_41E1_DE9593258637",
   "pitch": 1.22,
   "yaw": -91.81,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D4364F5F_C678_F2A0_41B6_1A9DCC7E42E8",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CB5D789E_C648_1FA0_41DF_496B2603085E, this.camera_C3237336_D3B1_29F6_41A1_50AB93ABD0CD); this.mainPlayList.set('selectedIndex', 6)",
   "toolTip": "Fruit Tree Orchard",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "yaw": -40.81,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.22,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "image": "this.AnimatedImageResource_DC6A6415_C648_36A0_41C3_5FD764AC2CF0",
   "pitch": 1.22,
   "yaw": -40.81,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D38EFB1B_C658_12A0_41D2_B522C073959F",
 "enabledInCardboard": true
},
{
 "mp3Url": "media/audio_C61B79A8_D309_0218_41E2_8680D3E8EB7D.mp3",
 "class": "AudioResource",
 "id": "audioresource_C6E87303_D30B_0609_41C2_D93556F6CB1A",
 "oggUrl": "media/audio_C61B79A8_D309_0218_41E2_8680D3E8EB7D.ogg"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CB5D789E_C648_1FA0_41DF_496B2603085E, this.camera_DC50C177_D3B1_2876_41B9_5C691432399D); this.mainPlayList.set('selectedIndex', 6)",
   "toolTip": "Fruit Tree Orchard",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "yaw": 168.46,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.04,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "image": "this.AnimatedImageResource_DC748415_C648_36A0_41C7_EE69DCA7050C",
   "pitch": -0.04,
   "yaw": 168.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D75FF815_C67F_FEA0_41B4_848B0814519C",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CB503455_C648_16A0_41CF_FF7584B17D37, this.camera_DC604158_D3B1_29BA_41E2_D7C61AB8C7F7); this.mainPlayList.set('selectedIndex', 4)",
   "toolTip": "Amphitheatre",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.79,
   "yaw": -120.2,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.56,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.79,
   "image": "this.AnimatedImageResource_DC74F415_C648_36A0_41B4_6595CB086F44",
   "pitch": -3.56,
   "yaw": -120.2,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D05F5FCF_C658_31A0_41E6_482134EEA526",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C, this.camera_C3112355_D3B1_298A_41E2_76D34B1DCE07); this.mainPlayList.set('selectedIndex', 10)",
   "toolTip": "Jungle Area",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "yaw": -4.63,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.3,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "image": "this.AnimatedImageResource_DC68E415_C648_36A0_41D2_3C28B7A8610B",
   "pitch": -2.3,
   "yaw": -4.63,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D53DFF54_C648_32A0_41E5_5EA08476668E",
 "enabledInCardboard": true
},
{
 "maxWidth": 58,
 "id": "IconButton_5A0D04CF_5772_E32E_41BB_81FF7DA1667F",
 "maxHeight": 58,
 "width": 58,
 "horizontalAlign": "center",
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_5A0D04CF_5772_E32E_41BB_81FF7DA1667F_pressed.png",
 "verticalAlign": "middle",
 "pressedRollOverIconURL": "skin/IconButton_5A0D04CF_5772_E32E_41BB_81FF7DA1667F_pressed_rollover.png",
 "minHeight": 1,
 "paddingRight": 0,
 "height": 58,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "transparencyActive": true,
 "paddingLeft": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": true,
 "iconURL": "skin/IconButton_5A0D04CF_5772_E32E_41BB_81FF7DA1667F.png",
 "class": "IconButton",
 "data": {
  "name": "IconButton HS "
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "maxWidth": 58,
 "id": "IconButton_5A0D24CF_5772_E32E_41D2_D193D2C1028D",
 "maxHeight": 58,
 "width": 58,
 "horizontalAlign": "center",
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_5A0D24CF_5772_E32E_41D2_D193D2C1028D_pressed.png",
 "verticalAlign": "middle",
 "pressedRollOverIconURL": "skin/IconButton_5A0D24CF_5772_E32E_41D2_D193D2C1028D_pressed_rollover.png",
 "minHeight": 1,
 "paddingRight": 0,
 "height": 58,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "transparencyActive": true,
 "paddingLeft": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": true,
 "iconURL": "skin/IconButton_5A0D24CF_5772_E32E_41D2_D193D2C1028D.png",
 "class": "IconButton",
 "data": {
  "name": "IconButton GYRO"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "maxWidth": 58,
 "id": "IconButton_5A0D54CF_5772_E32E_41CC_563BC5A99C44",
 "maxHeight": 58,
 "width": 58,
 "horizontalAlign": "center",
 "borderSize": 0,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingRight": 0,
 "height": 58,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "transparencyActive": true,
 "rollOverIconURL": "skin/IconButton_5A0D54CF_5772_E32E_41CC_563BC5A99C44_rollover.png",
 "paddingLeft": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": true,
 "iconURL": "skin/IconButton_5A0D54CF_5772_E32E_41CC_563BC5A99C44.png",
 "class": "IconButton",
 "data": {
  "name": "IconButton VR"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "maxWidth": 49,
 "id": "IconButton_46D29939_57B6_2572_4181_A29735EA1C2F",
 "maxHeight": 37,
 "width": 49,
 "horizontalAlign": "center",
 "right": 30,
 "borderSize": 0,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingRight": 0,
 "height": 37,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "bottom": 8,
 "transparencyActive": true,
 "rollOverIconURL": "skin/IconButton_46D29939_57B6_2572_4181_A29735EA1C2F_rollover.png",
 "paddingLeft": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": true,
 "iconURL": "skin/IconButton_46D29939_57B6_2572_4181_A29735EA1C2F.png",
 "class": "IconButton",
 "data": {
  "name": "IconButton VR"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3, this.camera_C3B531A6_D3B1_2896_41E1_9C9CFCA3F748); this.mainPlayList.set('selectedIndex', 9)",
   "toolTip": "Senior Citizens",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "yaw": 53.35,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.2,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "image": "this.AnimatedImageResource_C1A83761_D399_BB66_41CF_1BA699E6A5DD",
   "pitch": -0.2,
   "yaw": 53.35,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D566BD25_C648_16E0_41DA_7B5329E8F533",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA, this.camera_DC46F187_D3B1_2896_41E2_7BC20E587CB4); this.mainPlayList.set('selectedIndex', 7)",
   "toolTip": "Basketball Court",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "yaw": -125.47,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.04,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "image": "this.AnimatedImageResource_DC6AC415_C648_36A0_41E2_26414C3902A5",
   "pitch": -0.04,
   "yaw": -125.47,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D2F5D202_C658_72A0_41E6_943C7F248E3A",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03, this.camera_C33D22F3_D3B1_288E_41D1_8A37AD48252F); this.mainPlayList.set('selectedIndex', 2)",
   "toolTip": "Swimming Pool",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.79,
   "yaw": 166.2,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.3,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.79,
   "image": "this.AnimatedImageResource_DC754415_C648_36A0_41D1_3330645A19EA",
   "pitch": -3.3,
   "yaw": 166.2,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D6AA6DD5_C648_71A0_41DA_F45F8F8D5CD9",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "toolTip": "Amphitheatre",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "yaw": -105.26,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.29,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "image": "this.AnimatedImageResource_DF52436B_C6C8_3160_41A9_E2D8FA86597D",
   "pitch": -0.29,
   "yaw": -105.26,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D665BC0C_C648_F6A0_41DE_331CD3F5972B",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F, this.camera_C3D8F2A5_D3B1_288A_41C2_ADA4E4CAC957); this.mainPlayList.set('selectedIndex', 11)",
   "toolTip": "Bounce Land",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.79,
   "yaw": -175.72,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.8,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.79,
   "image": "this.AnimatedImageResource_DC683415_C648_36A0_41E8_B8ABA1B87976",
   "pitch": -2.8,
   "yaw": -175.72,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D57BA8C6_C648_FFA0_41D8_8318277867E7",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3, this.camera_C3CEC2C4_D3B1_288A_41B7_8B52796DEC88); this.mainPlayList.set('selectedIndex', 9)",
   "toolTip": "Senior Citizen",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.79,
   "yaw": -70.71,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.8,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.79,
   "image": "this.AnimatedImageResource_DC684415_C648_36A0_41E6_FB528D5FFEC9",
   "pitch": -2.8,
   "yaw": -70.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D25DBA7A_C648_7360_41CC_915449C35C0D",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C, this.camera_C39BC1F6_D3B1_2876_41BC_A40CF08EE72B); this.mainPlayList.set('selectedIndex', 10)",
   "toolTip": "Jungle Area",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.79,
   "yaw": 144.34,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.05,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.79,
   "image": "this.AnimatedImageResource_DC697415_C648_36A0_41E4_EEBA69887969",
   "pitch": -3.05,
   "yaw": 144.34,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D4DC880E_C648_3EA0_41E5_7681453BB95E",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C, this.camera_C3A5F1D6_D3B1_28B6_41E6_FEB4ADD1815F); this.mainPlayList.set('selectedIndex', 8)",
   "toolTip": "Tennis Court",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "yaw": -123.46,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.46,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "image": "this.AnimatedImageResource_DC699415_C648_36A0_41E3_E3AE025D13B6",
   "pitch": 0.46,
   "yaw": -123.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D3913796_C648_F1A0_41DE_57F3C742BCAA",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "toolTip": "Swimming Pool",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.79,
   "yaw": -58.65,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.56,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.79,
   "image": "this.AnimatedImageResource_DC75D415_C648_36A0_41E6_288F4E8ED0C6",
   "pitch": -3.56,
   "yaw": -58.65,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D737E693_C648_73A0_41DD_FBE8F38DA3C2",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CB5546BC_C648_33E0_41E6_9A599596894C, this.camera_C3018365_D3B1_298A_41E5_760E73699D7A); this.mainPlayList.set('selectedIndex', 5)",
   "toolTip": "Party Lawn",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "yaw": 58.92,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.54,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "image": "this.AnimatedImageResource_DC746415_C648_36A0_41C0_416821C16218",
   "pitch": -0.54,
   "yaw": 58.92,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D42BD371_C678_1160_41A6_0D1EDDF8E6C5",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CB5546BC_C648_33E0_41E6_9A599596894C, this.camera_C3F80246_D3B1_2B96_41D6_30680AA69D0E); this.mainPlayList.set('selectedIndex', 5)",
   "toolTip": "Party Lawn",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.79,
   "yaw": -103.87,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 3.48,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.79,
   "image": "this.AnimatedImageResource_DC6B4415_C648_36A0_41E3_2AD1B2BCB4E3",
   "pitch": 3.48,
   "yaw": -103.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D429EB9C_C679_F1A0_41DE_FA83845518BB",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA, this.camera_C38A6225_D3B1_2B8A_41C7_5A9743EA060B); this.mainPlayList.set('selectedIndex', 7)",
   "toolTip": "Basketball Court",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "yaw": 133.8,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.22,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "image": "this.AnimatedImageResource_DC6B8415_C648_36A0_41C1_35E57E3E0E45",
   "pitch": 2.22,
   "yaw": 133.8,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D3D00797_C658_31A0_41DD_47DB9BB0B6D3",
 "enabledInCardboard": true
},
{
 "scrollBarMargin": 2,
 "id": "Container_5A0D64CF_5772_E32E_41D0_3F190463451B",
 "width": 110,
 "horizontalAlign": "center",
 "right": "0%",
 "borderSize": 0,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "verticalAlign": "middle",
 "minHeight": 1,
 "top": "0%",
 "paddingRight": 0,
 "height": 110,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingLeft": 0,
 "children": [
  "this.IconButton_5A0D74CF_5772_E32E_41CA_B71D343F60D3"
 ],
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": true,
 "gap": 10,
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "button menu sup"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "visible",
 "layout": "horizontal"
},
{
 "scrollBarMargin": 2,
 "id": "Container_5A0D44CF_5772_E32E_41D0_19B23A64B7F8",
 "children": [
  "this.IconButton_5A0D54CF_5772_E32E_41CC_563BC5A99C44",
  "this.IconButton_5A0D24CF_5772_E32E_41D2_D193D2C1028D",
  "this.IconButton_5A0D34CF_5772_E32E_41C5_75E2393767BE",
  "this.IconButton_5A0D04CF_5772_E32E_41BB_81FF7DA1667F",
  "this.IconButton_5A0D14CF_5772_E32E_4158_F5607133AB8C",
  "this.IconButton_5A0DE4CF_5772_E32E_41B2_E8D74E2067B2",
  "this.IconButton_5A0DF4CF_5772_E32E_41CE_2196B58CC419"
 ],
 "horizontalAlign": "center",
 "right": "0%",
 "width": "91.304%",
 "borderSize": 0,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingRight": 0,
 "height": "85.959%",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingLeft": 0,
 "bottom": "0%",
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": true,
 "gap": 3,
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-button set"
 },
 "visible": false,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "layout": "vertical"
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC760415_C648_36A0_41BF_A7B5631ADD72",
 "levels": [
  {
   "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0_HS_0_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC767415_C648_36A0_41E6_5331B51055DB",
 "levels": [
  {
   "url": "media/panorama_CAB35D5C_C648_16A0_41E4_B271349D91C9_0_HS_1_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC769415_C648_36A0_41B6_A1276A0E3F75",
 "levels": [
  {
   "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0_HS_0_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC752415_C648_36A0_41C3_5835385D58BD",
 "levels": [
  {
   "url": "media/panorama_CB53EF67_C648_3160_41E6_2FD935ECBC03_0_HS_1_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC709415_C648_36A0_41D5_C37236551576",
 "levels": [
  {
   "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0_HS_0_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_D03F86D4_C6C8_13A0_41E5_393FA8979039",
 "levels": [
  {
   "url": "media/panorama_CB286B53_C648_12A0_41CE_C15E45AC9836_0_HS_1_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC6BC415_C648_36A0_41E1_DE9593258637",
 "levels": [
  {
   "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0_HS_0_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC6A6415_C648_36A0_41C3_5FD764AC2CF0",
 "levels": [
  {
   "url": "media/panorama_CB6A8ADB_C649_F3A0_41CC_4009B36F31FA_0_HS_1_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC748415_C648_36A0_41C7_EE69DCA7050C",
 "levels": [
  {
   "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0_HS_0_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC74F415_C648_36A0_41B4_6595CB086F44",
 "levels": [
  {
   "url": "media/panorama_CB5546BC_C648_33E0_41E6_9A599596894C_0_HS_1_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC68E415_C648_36A0_41D2_3C28B7A8610B",
 "levels": [
  {
   "url": "media/panorama_CB54D2A3_C648_13E0_41D5_60BFC0AF8C7F_0_HS_0_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C1A83761_D399_BB66_41CF_1BA699E6A5DD",
 "levels": [
  {
   "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0_HS_0_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC6AC415_C648_36A0_41E2_26414C3902A5",
 "levels": [
  {
   "url": "media/panorama_CB47FC5C_C648_16A0_41C1_8F30E94C932C_0_HS_1_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC754415_C648_36A0_41D1_3330645A19EA",
 "levels": [
  {
   "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0_HS_0_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DF52436B_C6C8_3160_41A9_E2D8FA86597D",
 "levels": [
  {
   "url": "media/panorama_CB57721D_C648_72A0_41E3_FAC6439D7805_0_HS_1_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC683415_C648_36A0_41E8_B8ABA1B87976",
 "levels": [
  {
   "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0_HS_0_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC684415_C648_36A0_41E6_FB528D5FFEC9",
 "levels": [
  {
   "url": "media/panorama_CB50C080_C648_6FA0_41CA_FFE71D5EDB4C_0_HS_1_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC697415_C648_36A0_41E4_EEBA69887969",
 "levels": [
  {
   "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0_HS_0_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC699415_C648_36A0_41E3_E3AE025D13B6",
 "levels": [
  {
   "url": "media/panorama_CB5E0E1A_C648_32A0_41B4_CF6ACFF497D3_0_HS_1_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC75D415_C648_36A0_41E6_288F4E8ED0C6",
 "levels": [
  {
   "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0_HS_0_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC746415_C648_36A0_41C0_416821C16218",
 "levels": [
  {
   "url": "media/panorama_CB503455_C648_16A0_41CF_FF7584B17D37_0_HS_1_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC6B4415_C648_36A0_41E3_2AD1B2BCB4E3",
 "levels": [
  {
   "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0_HS_0_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_DC6B8415_C648_36A0_41C1_35E57E3E0E45",
 "levels": [
  {
   "url": "media/panorama_CB5D789E_C648_1FA0_41DF_496B2603085E_0_HS_1_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "maxWidth": 60,
 "id": "IconButton_5A0D74CF_5772_E32E_41CA_B71D343F60D3",
 "maxHeight": 60,
 "width": 60,
 "horizontalAlign": "center",
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_5A0D74CF_5772_E32E_41CA_B71D343F60D3_pressed.png",
 "verticalAlign": "middle",
 "pressedRollOverIconURL": "skin/IconButton_5A0D74CF_5772_E32E_41CA_B71D343F60D3_pressed_rollover.png",
 "minHeight": 1,
 "paddingRight": 0,
 "height": 60,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "transparencyActive": true,
 "click": "if(!this.Container_5A0D44CF_5772_E32E_41D0_19B23A64B7F8.get('visible')){ this.setComponentVisibility(this.Container_5A0D44CF_5772_E32E_41D0_19B23A64B7F8, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_5A0D44CF_5772_E32E_41D0_19B23A64B7F8, false, 0, null, null, false) }",
 "paddingLeft": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": true,
 "iconURL": "skin/IconButton_5A0D74CF_5772_E32E_41CA_B71D343F60D3.png",
 "class": "IconButton",
 "data": {
  "name": "image button menu"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "maxWidth": 58,
 "id": "IconButton_5A0DE4CF_5772_E32E_41B2_E8D74E2067B2",
 "maxHeight": 58,
 "width": 58,
 "horizontalAlign": "center",
 "borderSize": 0,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingRight": 0,
 "height": 58,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "transparencyActive": true,
 "rollOverIconURL": "skin/IconButton_5A0DE4CF_5772_E32E_41B2_E8D74E2067B2_rollover.png",
 "paddingLeft": 0,
 "paddingTop": 0,
 "click": "this.shareTwitter(window.location.href)",
 "paddingBottom": 0,
 "propagateClick": true,
 "iconURL": "skin/IconButton_5A0DE4CF_5772_E32E_41B2_E8D74E2067B2.png",
 "class": "IconButton",
 "data": {
  "name": "IconButton TWITTER"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "maxWidth": 58,
 "id": "IconButton_5A0DF4CF_5772_E32E_41CE_2196B58CC419",
 "maxHeight": 58,
 "width": 58,
 "horizontalAlign": "center",
 "borderSize": 0,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingRight": 0,
 "height": 58,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "transparencyActive": true,
 "rollOverIconURL": "skin/IconButton_5A0DF4CF_5772_E32E_41CE_2196B58CC419_rollover.png",
 "paddingLeft": 0,
 "paddingTop": 0,
 "click": "this.shareFacebook(window.location.href)",
 "paddingBottom": 0,
 "propagateClick": true,
 "iconURL": "skin/IconButton_5A0DF4CF_5772_E32E_41CE_2196B58CC419.png",
 "class": "IconButton",
 "data": {
  "name": "IconButton FB"
 },
 "shadow": false,
 "cursor": "hand"
}],
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": false,
 "gap": 10,
 "mouseWheelEnabled": true,
 "backgroundPreloadEnabled": true,
 "class": "Player",
 "scrollBarOpacity": 0.5,
 "desktopMipmappingEnabled": false,
 "data": {
  "name": "Player445"
 },
 "mobileMipmappingEnabled": false,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "visible",
 "vrPolyfillScale": 0.5,
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
