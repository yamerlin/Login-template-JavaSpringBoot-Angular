import { inject } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

export const AuthGuard = (route: ActivatedRouteSnapshot) => {
    const loginService = inject(LoginService);
    const router = inject(Router);
    const isLoggedIn = loginService.isLoggedIn();
    const token = localStorage.getItem('token');
    const allowedRoles = route.data['roles'] as string[];

    if(!isLoggedIn) {
        alert("Vous devez vous connecter pour accéder à cette page.");
        router.navigate(['/login']);
        return false;
    }

    const user = token ? loginService.getUserFromToken() : null;

    if (allowedRoles && !allowedRoles.includes(user?.role ?? '')) {
        console.log("Role : ");
        console.log(user?.role);
        router.navigate(['/acceuil']);
        alert("Vous n'avez pas le rôle requis pour accéder à cette page.");
        return false;
    }

    return true;
};