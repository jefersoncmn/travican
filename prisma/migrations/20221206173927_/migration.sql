-- CreateTable
CREATE TABLE `resourcetypes` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resources` (
    `id` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `id_resourceType` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productions` (
    `id` VARCHAR(191) NOT NULL,
    `level` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `id_costToUpgrade` VARCHAR(191) NOT NULL,
    `id_returnedResource` VARCHAR(191) NOT NULL,
    `timeToUpgrade` INTEGER NOT NULL,
    `timeToHarvest` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `soldiers` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `attack` INTEGER NOT NULL,
    `defense` INTEGER NOT NULL,
    `timeToSpawn` INTEGER NOT NULL,
    `id_costToSpawn` VARCHAR(191) NOT NULL,
    `id_budget` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `armys` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `army_soldier` (
    `id` VARCHAR(191) NOT NULL,
    `id_army` VARCHAR(191) NOT NULL,
    `id_soldier` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `worlds` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `lootPercentage` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `world_resourceType` (
    `id` VARCHAR(191) NOT NULL,
    `id_resourceType` VARCHAR(191) NOT NULL,
    `id_world` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lands` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `id_resource` VARCHAR(191) NOT NULL,
    `id_army` VARCHAR(191) NOT NULL,
    `positionX` INTEGER NOT NULL,
    `positionY` INTEGER NOT NULL,
    `id_world` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `lands_id_resource_key`(`id_resource`),
    UNIQUE INDEX `lands_id_army_key`(`id_army`),
    UNIQUE INDEX `lands_id_user_key`(`id_user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `producton_land` (
    `id` VARCHAR(191) NOT NULL,
    `id_land` VARCHAR(191) NOT NULL,
    `id_production` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wars` (
    `id` VARCHAR(191) NOT NULL,
    `id_landAttack` VARCHAR(191) NULL,
    `id_landDefense` VARCHAR(191) NULL,
    `timeToStart` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `id` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,
    `operation` VARCHAR(191) NOT NULL,
    `time` INTEGER NOT NULL,
    `completeTime` DATETIME(3) NOT NULL,
    `id_production` VARCHAR(191) NOT NULL,
    `id_soldier` VARCHAR(191) NOT NULL,
    `id_war` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `userName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,

    UNIQUE INDEX `users_userName_key`(`userName`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `refresh_token` (
    `id` VARCHAR(191) NOT NULL,
    `expiresIn` INTEGER NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `refresh_token_id_user_key`(`id_user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `resources` ADD CONSTRAINT `resources_id_resourceType_fkey` FOREIGN KEY (`id_resourceType`) REFERENCES `resourcetypes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productions` ADD CONSTRAINT `productions_id_costToUpgrade_fkey` FOREIGN KEY (`id_costToUpgrade`) REFERENCES `resources`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productions` ADD CONSTRAINT `productions_id_returnedResource_fkey` FOREIGN KEY (`id_returnedResource`) REFERENCES `resources`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `soldiers` ADD CONSTRAINT `soldiers_id_costToSpawn_fkey` FOREIGN KEY (`id_costToSpawn`) REFERENCES `resources`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `soldiers` ADD CONSTRAINT `soldiers_id_budget_fkey` FOREIGN KEY (`id_budget`) REFERENCES `resources`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `army_soldier` ADD CONSTRAINT `army_soldier_id_army_fkey` FOREIGN KEY (`id_army`) REFERENCES `armys`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `army_soldier` ADD CONSTRAINT `army_soldier_id_soldier_fkey` FOREIGN KEY (`id_soldier`) REFERENCES `soldiers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `world_resourceType` ADD CONSTRAINT `world_resourceType_id_resourceType_fkey` FOREIGN KEY (`id_resourceType`) REFERENCES `resourcetypes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `world_resourceType` ADD CONSTRAINT `world_resourceType_id_world_fkey` FOREIGN KEY (`id_world`) REFERENCES `worlds`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lands` ADD CONSTRAINT `lands_id_resource_fkey` FOREIGN KEY (`id_resource`) REFERENCES `resources`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lands` ADD CONSTRAINT `lands_id_army_fkey` FOREIGN KEY (`id_army`) REFERENCES `armys`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lands` ADD CONSTRAINT `lands_id_world_fkey` FOREIGN KEY (`id_world`) REFERENCES `worlds`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lands` ADD CONSTRAINT `lands_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `producton_land` ADD CONSTRAINT `producton_land_id_land_fkey` FOREIGN KEY (`id_land`) REFERENCES `lands`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `producton_land` ADD CONSTRAINT `producton_land_id_production_fkey` FOREIGN KEY (`id_production`) REFERENCES `productions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wars` ADD CONSTRAINT `wars_id_landAttack_fkey` FOREIGN KEY (`id_landAttack`) REFERENCES `lands`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wars` ADD CONSTRAINT `wars_id_landDefense_fkey` FOREIGN KEY (`id_landDefense`) REFERENCES `lands`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `refresh_token` ADD CONSTRAINT `refresh_token_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
