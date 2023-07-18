import React from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';


function Paginacao({page, ativo, listagem}) {
    return(
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', width: '100%' }}>
        {page > 1 &&
          <button
            style={{ backgroundColor: 'transparent', border: 0, cursor: 'pointer', margin: 10 }}
            onClick={() => listagem(page - 1, ativo)}>
            <MdChevronLeft size={20} />
          </button>
        }
        <button
          style={{ backgroundColor: 'transparent', border: 0, cursor: 'pointer', margin: 10 }}
          onClick={() => listagem(page + 1, ativo)}>
          <MdChevronRight size={20} />
        </button>
      </div>
    )
}

export default Paginacao;