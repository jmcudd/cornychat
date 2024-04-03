import React from 'react';
import {useMqParser} from '../lib/tailwind-mqp';
import {useJam} from '../jam-core-react';

const iOS =
  /^iP/.test(navigator.platform) ||
  (/^Mac/.test(navigator.platform) && navigator.maxTouchPoints > 4);

const macOS = /^Mac/.test(navigator.platform) && navigator.maxTouchPoints === 0;

export default function StartFromURL({roomId, newRoom}) {
  const [, {setProps, createRoom, autoJoinOnce}] = useJam();
  let mqp = useMqParser();

  let submit = e => {
    e.preventDefault();
    setProps('userInteracted', true);
    autoJoinOnce(); // => enter room as soon as create room succeeded
    // (^ causes room to be entered in the same microtask where also room info updates;
    // if we await createRoom the microtask queue is already emptied)
    createRoom(roomId, newRoom);
  };

  return (
    <div className={mqp('p-2 pt-60 md:p-10 md:pt-60 text-white')}>
      <h1>Start a Room</h1>
      <p className="mb-6">
        The room with ID{' '}
        <code className="text-gray-900 bg-yellow-100">{roomId}</code> does not
        exist yet.
      </p>

      <button
        onClick={submit}
        className="select-none h-12 px-6 text-lg text-black bg-gray-200 rounded-lg focus:shadow-outline active:bg-gray-300"
      >
        🌱 Start room
      </button>

      <div className={'hidden'}>
      <div className={iOS ? 'mt-40 text-gray-500 text-center' : 'hidden'}>
        🎧 Use headphones or earbuds
        <br />
        for the best audio experience on iOS
      </div>

      <div className={macOS ? 'mt-40 text-gray-500 text-center' : 'hidden'}>
        🎧 Use Chrome or Firefox instead of Safari
        <br />
        for the best audio experience on macOS
      </div>
      </div>
    </div>
  );
}
