-- CreateTable
CREATE TABLE `specialites` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nomspecialite` VARCHAR(50) NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `specialites_nomspecialite_key`(`nomspecialite`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `editeurs` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `maisonedit` VARCHAR(50) NOT NULL,
    `siteweb` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `editeurs_maisonedit_key`(`maisonedit`),
    UNIQUE INDEX `editeurs_siteweb_key`(`siteweb`),
    UNIQUE INDEX `editeurs_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auteurs` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nomauteur` VARCHAR(50) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `numtel` VARCHAR(15) NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `auteurs_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `livres` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `isbn` VARCHAR(100) NOT NULL,
    `titre` VARCHAR(100) NOT NULL,
    `annedition` INTEGER NOT NULL,
    `prix` DOUBLE NOT NULL,
    `qtestock` INTEGER NOT NULL,
    `couverture` VARCHAR(255) NOT NULL,
    `specialite_id` INTEGER UNSIGNED NOT NULL,
    `editeur_id` INTEGER UNSIGNED NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `livre_auteur` (
    `auteur_id` INTEGER UNSIGNED NOT NULL,
    `livre_id` INTEGER UNSIGNED NOT NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    PRIMARY KEY (`auteur_id`, `livre_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `livres` ADD CONSTRAINT `livres_editeur_id_fkey` FOREIGN KEY (`editeur_id`) REFERENCES `editeurs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `livres` ADD CONSTRAINT `livres_specialite_id_fkey` FOREIGN KEY (`specialite_id`) REFERENCES `specialites`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `livre_auteur` ADD CONSTRAINT `livre_auteur_auteur_id_fkey` FOREIGN KEY (`auteur_id`) REFERENCES `auteurs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `livre_auteur` ADD CONSTRAINT `livre_auteur_livre_id_fkey` FOREIGN KEY (`livre_id`) REFERENCES `livres`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
