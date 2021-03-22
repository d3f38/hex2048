import React, { useState } from 'react';
import cn from 'classnames';
import { calculatePosition } from '../utils';
import useGame from '../hooks/useGame';

const COLORS = {
  0: '#FFFFFF',
  2: '#ECE4DB',
  4: '#EBE0CA',
  8: '#E9B381',
  16: '#E8996C',
  32: '#E78267',
  64: '#E56747',
  128: '#E8CF7F',
  256: '#E8CC72',
  512: '#E7C865',
  1024: '#E7C559',
  2048: '#E7C065',
};

const GAME_OPTIONS = [2, 3, 4];

export default ({ location: { hash } }) => {
  const initialRadius = hash.replace(/[^\d]/g, '') || 2;

  const [activeRadius, setActiveRadius] = useState(initialRadius);
  const [server, setServer] = useState('http://localhost:13337/');

  const { cells, statusGame, visibleHex } = useGame(server, activeRadius);

  return (
    <div className="settings">
      <div className="server">
        <div className="server-select__title">RNG-server url</div>

        <select
          id="url-server"
          className="server-select__select"
          value={server}
          onChange={(e) => setServer(e.target.value)}
        >
          <option
            id="remote"
            value="//68f02c80-3bed-4e10-a747-4ff774ae905a.pub.instances.scw.cloud"
          >
            Remote server
          </option>
          <option id="localhost" value="http://localhost:13337/">
            Local server
          </option>
        </select>
      </div>

      <div className="radius">
        <span className="radius__title">Select radius</span>

        {GAME_OPTIONS.map((option) => (
          <button
            key={`option-${option}`}
            type="button"
            className={cn('radius__button', { radius__button_active: activeRadius === option })}
            onClick={() => setActiveRadius(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="hex">
        {cells &&
          cells.map((item, index) => {
            return (
              <div
                className="hex__cell"
                style={{
                  position: 'absolute',
                  ...(visibleHex[index] && calculatePosition(visibleHex[index])),
                  color: item.value >= 8 ? 'white' : 'rgb(118, 110, 102)',
                }}
                key={JSON.stringify(item)}
                data-x={item.x}
                data-y={item.y}
                data-z={item.z}
                data-value={item.value}
              >
                {item.value > 0 && item.value}

                <span style={{ fontSize: '10px', color: 'grey', whiteSpace: 'nowrap' }}>
                  {item.x} {item.y} {item.z}
                </span>

                <div className="hex__bg-border" />

                <svg
                  className="hex__bg"
                  id="0.2954830724409139"
                  height="108.25317547305482"
                  width="125"
                  fill="none"
                  viewBox="0 0 190 164"
                >
                  <path
                    id="0.2954830724409139"
                    d="M47.3255 163.2L0 81.836L46.3707 0H142.802L190 82.3093L143.757 163.2H47.3255Z"
                    fill={COLORS[item.value]}
                  />
                </svg>
              </div>
            );
          })}
      </div>

      <div>
        Game Status: <span data-status={statusGame}>{statusGame}</span>
      </div>
    </div>
  );
};
