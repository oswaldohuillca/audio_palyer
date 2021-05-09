class Pagination{
    start;
    items;
    constructor(start,items){
        this.start = start;
        this.items = items;
    }
    paginate(array){
        return array.slice((this.start-1)*this.items,this.start*this.items);
    }
    totalPages(array){
        return Math.ceil(array.length / this.items);
    }

}

export default Pagination;