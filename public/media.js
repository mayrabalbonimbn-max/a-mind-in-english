/* Shared, dependency-free media primitives. Raw recordings stay in IndexedDB;
   only textual metadata belongs to the normal sync/backup document. */
(function () {
  'use strict';
  const DB = 'klang-private-recordings-v1', STORE = 'recordings';
  function open() {
    return new Promise((resolve, reject) => {
      if (!window.indexedDB) return reject(new Error('indexeddb_unavailable'));
      const r = indexedDB.open(DB, 1);
      r.onupgradeneeded = () => r.result.createObjectStore(STORE);
      r.onsuccess = () => resolve(r.result);
      r.onerror = () => reject(r.error || new Error('indexeddb_failed'));
    });
  }
  async function tx(mode, action) {
    const db = await open();
    return new Promise((resolve, reject) => {
      const t = db.transaction(STORE, mode), s = t.objectStore(STORE), r = action(s);
      r.onsuccess = () => resolve(r.result); r.onerror = () => reject(r.error);
      t.oncomplete = () => db.close(); t.onerror = () => reject(t.error);
    });
  }
  const put = (key, blob) => tx('readwrite', s => s.put(blob, key));
  const get = key => tx('readonly', s => s.get(key));
  const remove = key => tx('readwrite', s => s.delete(key));
  function mime() {
    const candidates = ['audio/webm;codecs=opus', 'audio/mp4', 'audio/webm'];
    return candidates.find(x => window.MediaRecorder && MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(x)) || '';
  }
  window.KLANG_MEDIA = { put, get, remove, preferredMime: mime, supported: () => !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder) };
})();
