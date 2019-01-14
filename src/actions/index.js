
import axios from 'axios';
import { cache } from '../App';

// action triggered when a case is pressed 
// default value is loading for all , loads cached object
// then tries to send api request and updates state if necessary
export const caseSelected = (key) => async (dispatch) => {
        let obj = {};
        obj.key = 'loading';
        obj.rationale = 'loading';
        obj.index = 'loading';
        obj.monthlyReturns = 'loading';
        obj.yearlyReturns = 'loading';

        cache.peekItem(`${key}`, (err, value) => {
            const some = value;
            if (typeof some === 'undefined') {
                dispatch({ 
                    type: 'case_selected',
                    payload: obj
                });
            } else {
                dispatch({ 
                    type: 'case_selected',
                    payload: JSON.parse(some)
                });
            }    
        });
        //api call
        try {
            const res = await axios.get(`https://api-dev.smallcase.com/smallcases/smallcase?scid=${key}`);
            if (res) {
                obj = {};
                obj.key = key;
                obj.rationale = res.data.data.rationale.replace(/<(?:.|\n)*?>/gm, '');
                obj.index = res.data.data.stats.indexValue;
                obj.monthlyReturns = res.data.data.stats.returns.monthly;
                obj.yearlyReturns = res.data.data.stats.returns.yearly;
                obj.imageUrl = `https://assets.smallcase.com/images/smallcases/130/${key}.png`;
                cache.setItem(`${key}`, JSON.stringify(obj), (err) => {
                    console.log(err);
                });
                dispatch({ 
                    type: 'case_selected',
                    payload: obj
                });
            }  
        } catch (error) {
            console.log('error = ', error); 
        }          
};

// action triggered when a graph needs to be loaded 
// default value is empty, loads cached object
// then tries to send api request and updates state if necessary after parsing
export const loadGraph = (key) => async (dispatch) => {
    const obj = {};
    obj.array = [];
    cache.peekItem(`${key}graph`, (err, value) => {
        const some = value;
        if (typeof some === 'undefined') {
            dispatch({ 
                type: 'graph_loaded',
                payload: obj
            });
        } else {
            dispatch({ 
                type: 'graph_loaded',
                payload: JSON.parse(some)
            });
        }    
    });
    try {
        const res = await axios.get(`https://api-dev.smallcase.com/smallcases/historical?scid=${key}`);
        if (res) {
            const array = [];
            res.data.data.points.forEach(myFunction); 
            function myFunction(item) {
                if (typeof item.index === 'number') { 
                    array.push(item.index);
                } 
            } 
            console.log(array);
            const obj = {};
            obj.array = array;
            cache.setItem(`${key}graph`, JSON.stringify(obj), (err) => {
                console.log(err);
            });
            dispatch({ 
                type: 'graph_loaded',
                payload: obj
            });
        }  
    } catch (error) {
        console.log('error = ', error); 
    }  
};
