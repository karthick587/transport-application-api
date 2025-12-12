const { AppDataSource } = require("../database/databaseProvider");

async function getLookUp(type) {
    try {
        const lookUpRepo = AppDataSource.getRepository("lookup");

        const lookUps = await lookUpRepo
            .createQueryBuilder("lookup")
            .select([
                "lookup.id",
                "lookup.code",
                "lookup.name",
                "lookup.type",
            ])
            .where("lookup.type = :type", { type: type })
            .andWhere("lookup.isDeleted = :isDeleted", { isDeleted: 0 })
            .getMany();

        return lookUps;

    } catch (err) {
        console.error("Error fetching lookUps:", err);
        throw new Error("Failed to load lookUps list");
    }
}


module.exports = {
    getLookUp
};




// const user = await userRepo
//     .createQueryBuilder("user")
//     .select(["user.id", "user.name", "user.email"])
//     .where("user.id = :id", { id: req.params.id })
//     .getOne();

// res.json(user);



// const users = await userRepo
//     .createQueryBuilder("user")
//     .leftJoinAndSelect("user.posts", "post")
//     .select([
//         "user.id",
//         "user.name",
//         "post.id",
//         "post.title"
//     ])
//     .getMany();

// res.json(users);



// const users = await userRepo
//     .createQueryBuilder("user")
//     .select(["user.id", "user.name"])
//     .orderBy("user.id", "DESC")
//     .getMany();


// const users = await userRepo
//     .createQueryBuilder("user")
//     .limit(10)
//     .getMany();

