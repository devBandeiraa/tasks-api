export class Database {
    #task = []

    select(search){
        if (!search) return this.#task

        return this.#task.filter(task => {
            return (
                task.title.includes(search) ||
                task.description.includes(search)
            )
        })
    }

    insert(task){
        this.#task.push(task)
    }

    findById(id){
        return this.#task.find(task => task.id === id)
    }

    update(id, data){
        const task = this.findById(id)
        Object.assign(task, data)
    }

    delete(id){
        this.#task = this.#task.filter(task => task.id !== id)
    }


}