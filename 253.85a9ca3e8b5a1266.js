"use strict";(self.webpackChunkangor=self.webpackChunkangor||[]).push([[253],{7253:(Q,L,l)=>{l.d(L,{m:()=>H});var h=l(467),p=l(4412),E=l(1413),A=l(1985),C=l(8810),f=l(6648),R=l(7673),x=l(6977),U=l(5964),T=l(8141),P=l(6697),b=l(5558),M=l(6354),K=l(9437),k=l(7442),y=l(3953),_=l(1553),B=l(6324),W=l(4224),I=l(6231);let H=(()=>{class o{constructor(e,t,s,i){this._metadataService=e,this._signerService=t,this._indexedDBService=s,this._relayService=i,this.chatList=[],this.latestMessageTimestamps={},this.messageQueue=[],this.isDecrypting=!1,this.decryptedPrivateKey="",this._chat=new p.t(null),this._chats=new p.t(null),this._contact=new p.t(null),this._contacts=new p.t(null),this._profile=new p.t(null),this._unsubscribeAll=new E.B}get profile$(){return this._profile.asObservable()}get chat$(){return this._chat.asObservable()}get chats$(){return this._chats.asObservable()}get contact$(){return this._contact.asObservable()}get contacts$(){return this._contacts.asObservable()}checkCurrentChatOnPageRefresh(e){e&&this.getChatById(e).subscribe(s=>{s&&(this._chat.next(s),this.loadChatHistory(e))})}getContact(e){var t=this;return(0,h.A)(function*(){try{if(!e)return;const s=yield t._metadataService.fetchMetadataWithCache(e);s&&(t._contact.next({pubKey:e,displayName:s.name?s.name:"Unknown",picture:s.picture,about:s.about}),t._indexedDBService.getMetadataStream().pipe((0,x.Q)(t._unsubscribeAll)).subscribe(a=>{a&&a.pubkey===e&&t._contact.next({pubKey:e,displayName:a.metadata.name?a.metadata.name:"Unknown",picture:a.metadata.picture,about:a.metadata.about})}))}catch(s){console.error("Error fetching contact metadata:",s)}})()}getContacts(){return new A.c(e=>(this._indexedDBService.getAllUsers().then(t=>{if(t&&t.length>0){const s=t.map(i=>(i.pubKey||console.error("Contact is missing pubKey:",i),i));this._contacts.next(s),e.next(s)}else e.next([]);e.complete()}).catch(t=>{console.error("Error loading cached contacts from IndexedDB:",t),e.next([]),e.complete()}),{unsubscribe(){}}))}updateChatListMetadata(){var e=this;return(0,h.A)(function*(){const t=e.chatList.map(s=>s.contact?.pubKey).filter(s=>s);t.length>0&&((yield e._metadataService.fetchMetadataForMultipleKeys(t)).forEach(i=>{const a=e._contacts.value?.find(n=>n.pubKey===i.pubkey);a&&(a.displayName=i.metadata.name||"Unknown",a.picture=i.metadata.picture||a.picture,a.about=i.metadata.about||a.about);const r=e.chatList.find(n=>n.contact?.pubKey===i.pubkey);r&&(r.contact.displayName=i.metadata.name||"Unknown",r.contact.picture=i.metadata.picture||r.contact.picture,r.contact.about=i.metadata.about||r.contact.about)}),e._chats.next(e.chatList),e._contacts.next(e._contacts.value||[]))})()}subscribeToRealTimeMetadataUpdates(e){this._metadataService.getMetadataStream().pipe((0,U.p)(t=>t&&t.pubkey===e)).subscribe(t=>{const s=this.chatList.find(a=>a.contact?.pubKey===e);s&&(s.contact.displayName=t.metadata.name||"Unknown",s.contact.picture=t.metadata.picture||s.contact.picture,s.contact.about=t.metadata.about||s.contact.about,this._chats.next(this.chatList));const i=this._contacts.value?.find(a=>a.pubKey===e);i&&(i.displayName=t.metadata.name||"Unknown",i.picture=t.metadata.picture||i.picture,i.about=t.metadata.about||i.about,this._contacts.next(this._contacts.value||[]))})}getProfile(){var e=this;return(0,h.A)(function*(){try{const t=e._signerService.getPublicKey(),s=yield e._metadataService.fetchMetadataWithCache(t);s&&(e._profile.next(s),e._indexedDBService.getMetadataStream().pipe((0,x.Q)(e._unsubscribeAll)).subscribe(i=>{i&&i.pubkey===t&&e._profile.next(i.metadata)}))}catch(t){console.error("Error fetching profile metadata:",t)}})()}getChats(){var e=this;return(0,h.A)(function*(){return e.getChatListStream().pipe((0,T.M)(t=>{if(t&&0===t.length)return;const s=t.filter(i=>i.contact?.pubKey).map(i=>i.contact.pubKey);e.subscribeToRealTimeMetadataUpdatesBatch(s)}))})()}InitSubscribeToChatList(){var e=this;return(0,h.A)(function*(){const t=e._signerService.getPublicKey(),s=yield e._signerService.isUsingExtension(),i=yield e._signerService.isUsingSecretKey();return e.decryptedPrivateKey=i?yield e._signerService.getDecryptedSecretKey():"",yield Promise.all([e.updateChatListMetadata(),e.subscribeToChatList(t,s,i,e.decryptedPrivateKey)]),e.getChatListStream()})()}subscribeToRealTimeMetadataUpdatesBatch(e){e.forEach(t=>{this.subscribeToRealTimeMetadataUpdates(t)})}subscribeToChatList(e,t,s,i){var a=this;return this._relayService.ensureConnectedRelays().then((0,h.A)(function*(){const r=[{kinds:[4],authors:[e],limit:1500},{kinds:[4],"#p":[e],limit:1500}];var n;a._relayService.getPool().subscribeMany(a._relayService.getConnectedRelays(),r,{onevent:(n=(0,h.A)(function*(c){const u=c.pubkey===e?c.tags.find(g=>"p"===g[0])?.[1]||"":c.pubkey;u&&c.created_at>(a.latestMessageTimestamps[u]||0)&&(a.messageQueue.push(c),a.processNextMessage(e,t,s,i))}),function(u){return n.apply(this,arguments)}),oneose:()=>{(a.chatList||[]).length>0&&a._chats.next(a.chatList)}})})),this.getChatListStream()}processNextMessage(e,t,s,i){var a=this;return(0,h.A)(function*(){if(!a.isDecrypting&&0!==a.messageQueue.length){a.isDecrypting=!0;try{for(;a.messageQueue.length>0;){const r=a.messageQueue.shift();if(!r)continue;const n=r.pubkey===e,c=n?r.tags.find(v=>"p"===v[0])?.[1]||"":r.pubkey;if(!c)continue;const u=yield a.decryptReceivedMessage(r,t,s,i,c);u&&a.addOrUpdateChatList(c,u,r.created_at,n)}}catch(r){console.error(r)}finally{a.isDecrypting=!1}}})()}addOrUpdateChatList(e,t,s,i){const a=this.chatList.find(n=>n.contact?.pubKey===e),r={id:`${e}-${s}`,chatId:e,contactId:e,isMine:i,value:t,createdAt:new Date(1e3*s).toISOString()};if(a)a.messages?.some(c=>c.id===r.id)||(a.messages=[...a.messages||[],r].sort((c,u)=>new Date(c.createdAt).getTime()-new Date(u.createdAt).getTime()),Number(a.lastMessageAt)<s&&(a.lastMessage=t,a.lastMessageAt=s.toString()));else{const n=this._contacts.value?.find(u=>u.pubKey===e)||{pubKey:e},c={id:e,contact:{pubKey:n.pubKey,name:n.name||"Unknown",picture:n.picture||"/images/avatars/avatar-placeholder.png",about:n.about||"",displayName:n.displayName||n.name||"Unknown"},lastMessage:t,lastMessageAt:s.toString(),messages:[r]};this.chatList.push(c)}this.chatList.sort((n,c)=>Number(c.lastMessageAt)-Number(n.lastMessageAt)),this._chats.next(this.chatList)}getChatListStream(){return this._chats.asObservable()}decryptReceivedMessage(e,t,s,i,a){var r=this;return(0,h.A)(function*(){return t&&!s?yield r._signerService.decryptMessageWithExtension(a,e.content):s&&!t?yield r._signerService.decryptMessage(i,a,e.content):void 0})()}loadChatHistory(e){var t=this;return(0,h.A)(function*(){const s=t._signerService.getPublicKey(),i=[{kinds:[4],authors:[s],"#p":[e],limit:10},{kinds:[4],authors:[e],"#p":[s],limit:10}];var a;t._relayService.getPool().subscribeMany(t._relayService.getConnectedRelays(),i,{onevent:(a=(0,h.A)(function*(r){const n=r.pubkey===s,c=n?e:r.pubkey,u=yield t._signerService.isUsingExtension(),v=yield t._signerService.isUsingSecretKey(),g=yield t.decryptReceivedMessage(r,u,v,t.decryptedPrivateKey,c);if(g){const m=Math.floor(r.created_at);t.addOrUpdateChatList(e,g,m,n),t._chat.next(t.chatList.find(S=>S.id===e))}}),function(n){return a.apply(this,arguments)}),oneose:()=>{}})})()}fetchChatHistory(e){var t=this;return(0,h.A)(function*(){const s=t._signerService.getPublicKey(),i=[{kinds:[4],authors:[s],"#p":[e],limit:10},{kinds:[4],authors:[e],"#p":[s],limit:10}],a=[];return t._relayService.getPool().subscribeMany(t._relayService.getConnectedRelays(),i,{onevent:(r=(0,h.A)(function*(n){const c=n.pubkey===s,u=c?e:n.pubkey,v=yield t._signerService.isUsingExtension(),g=yield t._signerService.isUsingSecretKey(),m=yield t.decryptReceivedMessage(n,v,g,t.decryptedPrivateKey,u);if(m){const S=Math.floor(n.created_at),$={id:n.id,chatId:e,contactId:u,isMine:c,value:m,createdAt:new Date(1e3*S).toISOString()};a.push($),t.addOrUpdateChatList(e,m,S,c),t._chat.next(t.chatList.find(F=>F.id===e))}}),function(c){return r.apply(this,arguments)}),oneose:()=>{}}),yield new Promise(r=>setTimeout(r,1e3)),a;var r})()}updateChat(e,t){return this.chats$.pipe((0,P.s)(1),(0,b.n)(s=>{const i=t.contact?.pubKey;if(!i)return(0,C.$)("No public key found for this chat");const a={kind:4,pubkey:i,content:JSON.stringify(t),created_at:Math.floor(Date.now()/1e3),tags:[["p",i]]};return a.id=(0,k.dq)(a),(0,f.H)(this._relayService.publishEventToRelays(a)).pipe((0,M.T)(()=>{if(s){const r=s.findIndex(n=>n.id===e);-1!==r&&(s[r]=t,this._chats.next(s))}return t}),(0,K.W)(r=>(console.error("Failed to update chat via Nostr:",r),(0,C.$)(r))))}))}getChatById(e,t=null){return this.recipientPublicKey=e,(0,f.H)(Promise.all([this._signerService.getPublicKey()])).pipe((0,b.n)(()=>this.chats$.pipe((0,P.s)(1),(0,b.n)(s=>{if(!s||0===s.length)return this.createNewChat(e,t);const i=s.find(a=>a.id===e);return i?(this._chat.next(i),this.loadChatHistory(this.recipientPublicKey),(0,R.of)(i)):this.createNewChat(e,t)}))),(0,K.W)(s=>(console.error("Error fetching chat by id from Nostr:",s),(0,C.$)(s))))}createNewChat(e,t=null){const s={id:e,contact:t||{pubKey:e,name:"Unknown",picture:"/images/avatars/avatar-placeholder.png"},lastMessage:"...",lastMessageAt:Math.floor(Date.now()/1e3).toString(),messages:[]};return(0,f.H)(this._metadataService.fetchMetadataWithCache(e)).pipe((0,M.T)(i=>(s.contact={pubKey:e,name:i?.name||"Unknown",picture:i?.picture||"/images/avatars/avatar-placeholder.png",about:i?.about||"",displayName:i?.displayName||i?.name||"Unknown"},s)),(0,b.n)(i=>(0,f.H)(this.fetchChatHistory(e)).pipe((0,M.T)(a=>{if(0===a.length){const n={id:`${e}-new-chat`,chatId:e,contactId:e,isMine:!0,value:"new chat...",createdAt:Math.floor(Date.now()/1e3).toString()};a.push(n)}if(s.messages=a,a.length>0){const n=a[a.length-1];s.lastMessage=n.value,s.lastMessageAt=n.createdAt}const r=this._chats.value?[...this._chats.value,s]:[s];return this._chats.next(r),this._chat.next(s),s}))))}resetChat(){this._chat.next(null)}sendPrivateMessage(e){var t=this;return(0,h.A)(function*(){try{t.message=e;const s=yield t._signerService.isUsingExtension(),i=yield t._signerService.isUsingSecretKey();if(s&&!i)yield t.handleMessageSendingWithExtension();else if(!s&&i){if(!t.isValidMessageSetup())return void console.error("Message, sender private key, or recipient public key is not properly set.");const a=yield t._signerService.encryptMessage(t.decryptedPrivateKey,t.recipientPublicKey,t.message),r=t._signerService.getUnsignedEvent(4,[["p",t.recipientPublicKey]],a),n=t._signerService.getSignedEvent(r,t.decryptedPrivateKey);(yield t._relayService.publishEventToRelays(n))?t.message="":console.error("Failed to send the message.")}}catch(s){console.error("Error sending private message:",s)}})()}handleMessageSendingWithExtension(){var e=this;return(0,h.A)(function*(){try{const t=yield e._signerService.encryptMessageWithExtension(e.message,e.recipientPublicKey),s=yield e._signerService.signEventWithExtension({kind:4,pubkey:e._signerService.getPublicKey(),tags:[["p",e.recipientPublicKey]],content:t,created_at:Math.floor(Date.now()/1e3)});(yield e._relayService.publishEventToRelays(s))?e.message="":console.error("Failed to send the message with extension.")}catch(t){console.error("Error sending message with extension:",t)}})()}isValidMessageSetup(){return""!==this.message.trim()&&""!==this.recipientPublicKey}ngOnDestroy(){this._unsubscribeAll.next(),this._unsubscribeAll.complete()}static#e=this.\u0275fac=function(t){return new(t||o)(y.KVO(_.T),y.KVO(B.A),y.KVO(W.n),y.KVO(I.b))};static#t=this.\u0275prov=y.jDH({token:o,factory:o.\u0275fac,providedIn:"root"})}return o})()}}]);