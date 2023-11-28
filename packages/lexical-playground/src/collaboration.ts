/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {Provider} from '@lexical/yjs';
import {WebsocketProvider} from 'y-websocket';
import {Doc} from 'yjs';
import {SocketIOProvider} from 'y-socket.io';

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const WEBSOCKET_ENDPOINT =
  params.get('collabEndpoint') || 'ws://localhost:1234';
const WEBSOCKET_SLUG = 'playground';
const WEBSOCKET_ID = params.get('collabId') || '0';

// parent dom -> child doc
export function createWebsocketProvider(
  id: string,
  yjsDocMap: Map<string, Doc>,
): Provider {
  let doc = yjsDocMap.get(id);

  if (doc === undefined) {
    doc = new Doc();
    yjsDocMap.set(id, doc);
  } else {
    doc.load();
  }

  // @ts-ignore
  return new WebsocketProvider(
    WEBSOCKET_ENDPOINT,
    WEBSOCKET_SLUG + '/' + WEBSOCKET_ID + '/' + id,
    doc,
    {
      connect: false,
    },
  );
}

////////////////////////////

// import {Provider} from '@lexical/yjs';

// import {Doc} from 'yjs';

// const websocketEndpoint = 'ws://gxwebsocketserver-env-dev.eba-g8j3q9um.ap-south-1.elasticbeanstalk.com';

// parent dom -> child doc
export function createSocketIoProvider(
  authToken: string,
  websocketEndpoint: string,
  id: string,
  yjsDocMap: Map<string, Doc>,
): Provider {
  // console.log(yjsDocMap);
  let doc = yjsDocMap.get(id);
  if (doc === undefined) {
    doc = new Doc();
    yjsDocMap.set(id, doc);
  } else {
    doc.load();
  }

  const ysocketio = new SocketIOProvider(websocketEndpoint, id, doc, {
    auth: {
      token: authToken,
    },
    autoConnect: false,
  });

  // @ts-ignore
  return ysocketio;
}
