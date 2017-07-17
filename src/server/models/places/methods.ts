const scopes: any = {
    byLocation(latitude: number, longitude: number, distance: number): any {
        return {
            where: {
                id: this.sequelize.literal(`(ST_Distance_Sphere(ST_MakePoint(${latitude}, ${longitude}), "location") <= ${distance})`)
            }
        }
    },
    byType(type: string): any {
        return type ? {
            where: {
                type
            }
        } : {};
    }
}

export const methods: any = {
    tableName: 'places',
    timestamps: false,
    scopes
};