const initialState = { 
    dataSourceArray: ['SCMO_0002',
                      'SCMO_0003', 
                      'SCMO_0006',
                      'SCNM_0003', 
                      'SCNM_0007',
                      'SCNM_0008',
                      'SCNM_0009'
                     ],
    detailData: {},
    graphData: []      
    };

export default (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
         case 'case_selected':
         return { ...state, detailData: action.payload };
         case 'graph_loaded':
         console.log('hiiii');
         console.log(action.payload.array);
         return { ...state, graphData: action.payload.array };
        default:
        return state;
    }
};

