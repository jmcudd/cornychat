import React from 'react';
import {makeLocalDate} from '../nostr/nostr';

export default function StartScheduledEvent({
    eventInfo,
  }) {
    //available fields:  startTime, endTime, image, location, title
    const localHumanDateTime = makeLocalDate(eventInfo.startTime);
    var coloringStyle = {
        backgroundColor: 'rgb(7,74,40)',
        backgroundImage: 'linear-gradient(rgb(7,74,40), rgb(0,0,0))',
        color: 'rgb(254,234,101)',
        maxWidth: '350px',
        cursor: 'pointer',
        display: 'inline-block',
        marginLeft: '2px',
        marginRight: '2px',
    };
    var coloringStyleExternal = {
        backgroundColor: 'rgb(74,74,40)',
        backgroundImage: 'linear-gradient(rgb(74,74,40), rgb(0,0,0))',
        color: 'rgb(254,234,101)',
        maxWidth: '350px',
        cursor: 'pointer',
        display: 'inline-block',
        marginLeft: '2px',
        marginRight: '2px',
    };
    var isExternal = !eventInfo?.location.startsWith(jamConfig.urls.jam);
    var imageUrl = eventInfo?.image ?? 'https://cornychat.com/img/cornychat-app-icon.jpg';

    return (
        <div className="">
        <a href={`${eventInfo.location}`}>
        <div className="select-none px-0 text-lg rounded-lg mt-3"
             style={isExternal ? coloringStyleExternal : coloringStyle}
        >
            <table cellpadding="0" cellspacing="0" border="0" style={{maxWidth:'350px',width:'350px'}}>
            <tr>
                <td rowspan="2" style={{width: '72px'}}>
                    <img src={imageUrl}
                        style={{width: '64px', height: '64px', objectFit: 'cover'}} />
                </td>
                <td align="left">{eventInfo?.title ?? eventInfo.location}</td></tr>
            <tr><td align="right" class="text-sm">{localHumanDateTime}</td></tr>
            </table>
        </div>
        </a>
        </div>
    );
}
