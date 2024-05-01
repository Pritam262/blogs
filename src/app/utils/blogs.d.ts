export interface BlogsInterface {
    success: {
        _id: string,
        user: string,
        title: string,
        description: string,
        content: string,
        date: string,
    }[]
}


export interface BlogInterface {
    success: {
        _id: string,
        user: string,
        title: string,
        description: string,
        content: string,
        date: string,
    }
}