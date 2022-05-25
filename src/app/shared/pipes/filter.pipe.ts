import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], filter: string) {
        // console.log("🚀 ~ file: filter.pipe.ts ~ line 8 ~ FilterPipe ~ transform ~ filter", filter)
        if ( !items|| !filter) {
            return items;
        }

        return this.filterData(items, filter);
    }

    private filterData(data: any[], filter) {
        const filteredData = !filter ? data : data.filter(obj => {
            const accumulator = (currentTerm, key) => currentTerm + obj[key];
            const dataStr = Object.keys(obj).reduce(accumulator, '').toLowerCase();
            const transformedFilter = filter.trim().toLowerCase();

            return dataStr.indexOf(transformedFilter) !== -1;
        });

        return filteredData;
    }
}

