import React, {useState} from 'react';
import {useMqParser} from '../../lib/tailwind-mqp';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import {avatarUrl, displayName} from '../../lib/avatar';

export function BasicRoomInfo({
  iOwn,
  info,
  name,
  setName,
  description,
  setDescription,
  logoURI,
  setLogoURI,
  closed,
  setClosed,
  closedBy,
  setClosedBy,
  isPrivate,
  setIsPrivate,
  isRecordingAllowed,
  setIsRecordingAllowed,
  stageOnly,
  setStageOnly,
  lud16,
  setLud16,
}) {

  let myname = displayName(info, undefined);

  let mqp = useMqParser();
  let [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p className="text-lg font-medium text-gray-200 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        {expanded ? '🔽' : '▶️'} Basic Room Info
      </p>
      <div className={expanded ? '' : 'hidden'}>
      <div className="mb-2">
        <p className="text-sm font-medium text-gray-300">
          Room topic: {!iOwn && (<span className="text-gray-300">{name}</span>)}
        </p>
        {iOwn && (
        <input
          className={mqp(
            'rounded-lg placeholder-black bg-gray-400 text-black border-4 pb-2 rounded-lg w-full md:w-96'
          )}
          type="text"
          placeholder="Room topic. Appears on the landing page when room is active."
          value={name}
          name="jam-room-topic"
          autoComplete="off"
          style={{
            fontSize: '15px',
          }}
          onChange={e => {
            setName(e.target.value);
          }}
        ></input>
        )}
      </div>

      <div className="my-2">
        <p className="text-sm font-medium text-gray-300">
          Room logo URI: {!iOwn && (logoURI)}
        </p>
        {iOwn && (
        <input
          className={mqp(
            'rounded-lg placeholder-black bg-gray-400 text-black border-4 pb-2 rounded-lg w-full md:w-96'
          )}
          type="text"
          placeholder="Logo URI. Displayed on the landing page when room is active."
          value={logoURI}
          name="jam-room-logo-uri"
          autoComplete="off"
          style={{
            fontSize: '15px',
          }}
          onChange={e => {
            setLogoURI(e.target.value);
          }}
        ></input>
        )}
      </div>

      <div className="my-2">
        <p className="text-sm font-medium text-gray-300">
          Lightning Address: {!iOwn && (lud16)}
        </p>
        {iOwn && (
        <input
          className={mqp(
            'rounded-lg placeholder-black bg-gray-400 text-black border-4 pb-2 rounded-lg w-full md:w-96'
          )}
          type="text"
          placeholder="Lightning Address. When set, it will display a action to allow for tipping the room to the specified address."
          value={lud16}
          name="jam-room-lud16"
          autoComplete="off"
          style={{
            fontSize: '15px',
          }}
          onChange={e => {
            setLud16(e.target.value);
          }}
        ></input>
        )}
      </div>

      <div className="mt-2">
        <p className="text-sm font-medium text-gray-300">
          Room Description {iOwn && ('(markdown supported)')}:
          {!iOwn && (
          <ReactMarkdown
          className="text-sm opacity-70 h-full mt-3 border-4"
          plugins={[gfm]}
          transformLinkUri={customUriTransformer}
          >
          {description}
          </ReactMarkdown>
          )}
        </p>
        {iOwn && (
        <textarea
          className={mqp(
            'rounded-lg placeholder-black bg-gray-400 text-black border-4 pb-2 rounded-lg w-full md:w-96'
          )}
          placeholder="Room description. Supports markdown."
          value={description}
          name="jam-room-description"
          autoComplete="off"
          rows="4"
          style={{
            fontSize: '15px',
          }}
          onChange={e => {
            setDescription(e.target.value);
          }}
        ></textarea>
        )}
      </div>

      <div className="mt-2">
        {iOwn && (
        <>
        <input
          className="ml-2"
          type="checkbox"
          name="jam-room-closed"
          id="jam-room-closed"
          onChange={() => {
            let isClosed = !closed;
            setClosed(isClosed);
            if(isClosed) {
              setClosedBy(myname);
            } else {
              setClosedBy('');
            }
          }}
          defaultChecked={closed}
        />
        <label
          className="pl-3 ml-0.5 text-sm font-medium text-gray-300 p-2"
          htmlFor="jam-room-closed"
        >
          Close the room
          <div className="p-2 pl-9 text-gray-300 text-sm">
            Closed rooms can only be joined by administrators and owners. 
            {closedBy.length > 0 && (`Room was closed by ${closedBy}`)}
          </div>
        </label>
        </>
        )}
        {!iOwn && closed && (
          <p className="text-gray-300 text-sm">
          <span className="font-medium text-gray-300">Closed</span> - Only owners and administrators can join the room.
          </p>
        )}
        {!iOwn && !closed && (
          <p className="text-gray-300 text-sm">
          <span className="font-medium text-gray-300">Open</span> - Anyone with the url can enter the room.
          </p>
        )}
      </div>

      <div className="mt-2">
        {iOwn && (
          <>
        <input
          className="ml-2"
          type="checkbox"
          name="jam-room-isprivate"
          id="jam-room-isprivate"
          onChange={() => {
            setIsPrivate(!isPrivate);
          }}
          defaultChecked={isPrivate}
        />
        <label
          className="pl-3 ml-0.5 text-sm font-medium text-gray-300 p-2"
          htmlFor="jam-room-isprivate"
        >
          Make room private
          <div className="p-2 pl-9 text-gray-300 text-sm">
            Private rooms are not displayed on the landing page, nor announced by the Corny Chat bot.
            Anyone can join a private room by navigating to the room url.
          </div>
        </label>
        </>
        )}
        {!iOwn && isPrivate && (
          <p className="text-gray-300 text-sm">
          <span className="font-medium text-gray-300">Private Room</span> - not displayed on landing
          page or announced by the Corny Chat bot. Anyone can join a private room by navigating
          to the room url.
          </p>
        )}
        {!iOwn && !isPrivate && (
          <p className="text-gray-300 text-sm">
          <span className="font-medium text-gray-300">Public Room</span> - displays on landing page and
          announced by Corny Chat bot.
          </p>
        )}
      </div>

      <div className="mt-2">
        {iOwn && (
          <>
        <input
          className="ml-2"
          type="checkbox"
          name="jam-room-isrecordingallowed"
          id="jam-room-isrecordingallowed"
          onChange={() => {
            setIsRecordingAllowed(!isRecordingAllowed);
          }}
          defaultChecked={isRecordingAllowed}
        />
        <label
          className="pl-3 ml-0.5 text-sm font-medium text-gray-300 p-2"
          htmlFor="jam-room-isrecordingallowed"
        >
          Allow Recordings
          <div className="p-2 pl-9 text-gray-300 text-sm">
            If recordings are allowed, then any moderator of the room can begin a recording
            in their client. Participants in the room are notified that a recording is in progress.
            If unchecked, the Start Recording option will not be present in the menu choices.
          </div>
        </label>
        </>
        )}
        {!iOwn && !isRecordingAllowed && (
          <p className="text-gray-300 text-sm">
            <span className="font-medium text-gray-300">Recordings Disabled</span>
          </p>
        )}
        {!iOwn && isRecordingAllowed && (
          <p className="text-gray-300 text-sm">
            <span className="font-medium text-gray-300">Recordings Allowed</span> - An owner or moderator can start 
            a recording and a visual indicator is shown to users in the room when a recording is in progress.
          </p>
        )}
      </div>

      <div className="mt-2">
        {iOwn && (
          <>
        <input
          className="ml-2"
          type="checkbox"
          name="jam-room-stageonly"
          id="jam-room-stageonly"
          onChange={() => {
            setStageOnly(!stageOnly);
          }}
          defaultChecked={stageOnly}
        />
        <label
          className="pl-3 ml-0.5 text-sm font-medium text-gray-300 p-2"
          htmlFor="jam-room-stageonly"
        >
          Stage Only room
          <div className="p-2 pl-9 text-gray-300 text-sm">
            When enabled, users entering the room will be brought on stage by default.
            A moderator can still move a user to the audience.
          </div>
        </label>
        </>
        )}
        {!iOwn && !stageOnly && (
          <p className="text-gray-300 text-sm">
            <span className="font-medium text-gray-300">Standard room</span> - Users will start in the
            audience and a room owner or moderator may invite them to the stage.
          </p>
        )}
        {!iOwn && stageOnly && (
          <p className="text-gray-300 text-sm">
            <span className="font-medium text-gray-300">Stage Only room</span> - Users will be placed on the stage and may speak freely.
          </p>
        )}
      </div>
      </div>
    </div>
  );
}

function customUriTransformer(uri) {
  const schemes = ['bitcoin:', 'lightning:'];
  for (const scheme of schemes) {
    if (uri.startsWith(scheme)) {
      return uri;
    }
  }
  return ReactMarkdown.uriTransformer(uri);
}