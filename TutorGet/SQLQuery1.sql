SET QUOTED_IDENTIFIER OFF;
GO
USE [C:\USERS\KE WANG\SOURCE\REPOS\KEWANG0068\TUTORGET\TUTORGET\APP_DATA\ASPNET-TUTORGET.MDF];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_LanguageTutor]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Tutors] DROP CONSTRAINT [FK_LanguageTutor];
GO
IF OBJECT_ID(N'[dbo].[FK_UserBooking]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Bookings] DROP CONSTRAINT [FK_UserBooking];
GO
IF OBJECT_ID(N'[dbo].[FK_TutorBooking]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Bookings] DROP CONSTRAINT [FK_TutorBooking];
GO
IF OBJECT_ID(N'[dbo].[FK_AvailableTimeTutor]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[AvailableTimes] DROP CONSTRAINT [FK_AvailableTimeTutor];
GO


-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[Tutors]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Tutors];
GO
IF OBJECT_ID(N'[dbo].[Languages]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Languages];
GO
IF OBJECT_ID(N'[dbo].[Bookings]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Bookings];
GO
IF OBJECT_ID(N'[dbo].[AvailableTimes]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AvailableTimes];
GO
IF OBJECT_ID(N'[dbo].[Events]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Events];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'Tutors'
CREATE TABLE [dbo].[Tutors] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max)  NOT NULL,
    [Experience] float  NOT NULL,
    [HourlyPrice] float  NOT NULL,
    [Rate] nvarchar(max)  NOT NULL,
    [Email] nvarchar(max)  NOT NULL,
    [LanguageId] int  NOT NULL
);
GO

-- Creating table 'Languages'
CREATE TABLE [dbo].[Languages] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [LanguageName] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'Bookings'
CREATE TABLE [dbo].[Bookings] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [DateTime] nvarchar(max)  NOT NULL,
    [UserId] nvarchar(128)  NOT NULL,
    [TutorId] int  NOT NULL
);
GO

-- Creating table 'AvailableTimes'
CREATE TABLE [dbo].[AvailableTimes] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Available] datetime  NOT NULL,
    [TutorId] int  NOT NULL
);
GO

-- Creating table 'Events'
CREATE TABLE [dbo].[Events] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [EventName] nvarchar(max)  NOT NULL,
    [Description] nvarchar(max)  NOT NULL,
    [Time] datetime not null,
    [Address] nvarchar(max)  NOT NULL,
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Id] in table 'Tutors'
ALTER TABLE [dbo].[Tutors]
ADD CONSTRAINT [PK_Tutors]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Languages'
ALTER TABLE [dbo].[Languages]
ADD CONSTRAINT [PK_Languages]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Bookings'
ALTER TABLE [dbo].[Bookings]
ADD CONSTRAINT [PK_Bookings]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'AvailableTimes'
ALTER TABLE [dbo].[AvailableTimes]
ADD CONSTRAINT [PK_AvailableTimes]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Events'
ALTER TABLE [dbo].[Events]
ADD CONSTRAINT [PK_Events]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [LanguageId] in table 'Tutors'
ALTER TABLE [dbo].[Tutors]
ADD CONSTRAINT [FK_LanguageTutor]
    FOREIGN KEY ([LanguageId])
    REFERENCES [dbo].[Languages]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_LanguageTutor'
CREATE INDEX [IX_FK_LanguageTutor]
ON [dbo].[Tutors]
    ([LanguageId]);
GO

-- Creating foreign key on [UserId] in table 'Bookings'
ALTER TABLE [dbo].[Bookings]
ADD CONSTRAINT [FK_UserBooking]
    FOREIGN KEY ([UserId])
    REFERENCES [dbo].[AspNetUsers]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_UserBooking'
CREATE INDEX [IX_FK_UserBooking]
ON [dbo].[Bookings]
    ([UserId]);
GO

-- Creating foreign key on [TutorId] in table 'Bookings'
ALTER TABLE [dbo].[Bookings]
ADD CONSTRAINT [FK_TutorBooking]
    FOREIGN KEY ([TutorId])
    REFERENCES [dbo].[Tutors]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_TutorBooking'
CREATE INDEX [IX_FK_TutorBooking]
ON [dbo].[Bookings]
    ([TutorId]);
GO

-- Creating foreign key on [TutorId] in table 'AvailableTimes'
ALTER TABLE [dbo].[AvailableTimes]
ADD CONSTRAINT [FK_AvailableTimeTutor]
    FOREIGN KEY ([TutorId])
    REFERENCES [dbo].[Tutors]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_AvailableTimeTutor'
CREATE INDEX [IX_FK_AvailableTimeTutor]
ON [dbo].[AvailableTimes]
    ([TutorId]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------