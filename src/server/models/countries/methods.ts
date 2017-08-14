const scopes: any = {
    byLocation(latitude: number, longitude: number): any {
        return {
            where: {
                id: this.sequelize.literal(`ST_Contains("border", ST_MakePoint(${latitude}, ${longitude})) = TRUE`)
            }
        }
    },
}

export const methods = {
    tableName: 'countries',
    timestamps: false,
    scopes
};