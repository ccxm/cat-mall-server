// 存放一些公共的控制器函数
export class test {
    constructor(x:number)
    constructor(x:string, y:number)
    constructor(x?:any,y?:any) {
        console.log(x,y)
    }
}

new test(1)
new test('1',2)
